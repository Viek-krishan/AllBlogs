import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  UploadFileToCloudinary,
  DeleteFileFromCloudinary,
} from "../utils/Cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const AccessToken = await user.GenerateAccessToken();
    const RefreshToken = await user.GenerateRefreshToken();

    user.refreshToken = RefreshToken;
    user.save();

    return { AccessToken, RefreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const RegisterUser = asyncHandler(async (req, res) => {
  /*fetch data from frontend
		  check for validation
		  check if user already exist
		  check for file, avatar
		  check for file upload process, cloudinary
		  create new user obj
		  remove password and refresh tokens from response
		  check for user creation
		  res.send( user )
		  */

  // console.log(req.body);
  const { fullName, email, username, age, passkey } = req.body;

  if (!fullName || !email || !username || !age || !passkey)
    throw new ApiError(400, "Please enter all fields");

  if (!email.includes("@") || email.includes("+"))
    throw new ApiError(400, "Please enter valid email");

  const ExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (ExistedUser)
    throw new ApiError(400, "Given username or email is already registered");

  // TODO check file path
  const AvatartLocalPath = req.file?.path;
  let Avatar;
  if (AvatartLocalPath) {
    // throw new ApiError(400, "Avatar is required. Please upload");
    Avatar = await UploadFileToCloudinary(AvatartLocalPath);

    if (!Avatar)
      throw new ApiError(
        500,
        "Something went wrong with Avatar!!, Please upload once again"
      );
  }

  const user = await User.create({
    fullName,
    email,
    age,
    password: passkey,
    username,
    avatar: Avatar?.url,
  });

  const CreatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!CreatedUser)
    throw new ApiError(500, "Something went wrong while user registration");

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        CreatedUser,
        "User registration completed successfully"
      )
    );
});

const LogInUser = asyncHandler(async (req, res) => {
  /*
	    1. get the logIn data from req.body - username, email, password
	    2. check for the authentication data
	    3. check if the user is available or not
	    4. check for password
	    5. generate refresh & access tokens
	    6 give response
	    */

  const { email, username, passkey } = req.body;

  if (!(email || username))
    throw new ApiError(401, "Either username or email is required");

  if (!passkey) throw new ApiError(401, "Password is required");

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(404, "Provided username or email not found");

  const isValid = await user.isPasswordCorrect(passkey);

  if (!isValid) throw new ApiError(401, "Entered Credential is not correct");

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
    user?._id
  );

  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("RefreshToken", RefreshToken, options)
    .cookie("AccessToken", AccessToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: logedInUser,
          RefreshToken,
          AccessToken,
        },
        "User Loged In successfully"
      )
    );
});

const LogOutUser = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options);
});

const regenerateRefreshToken = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.RefreshToken || req.body.RefreshToken;

    if (!token) throw new ApiError(401, "Unauthorized request");

    const DecodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRATE);

    const user = await User.findById(DecodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(400, "Invalid Token");

    const { RefreshToken, AccessToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("RefreshToken", RefreshToken, options)
      .cookie("AccessToken", AccessToken, options)
      .json(
        new ApiResponse(
          201,
          {
            RefreshToken,
            AccessToken,
          },
          "Refresh token regenerated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Token");
  }
});

const ChangeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const GetUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "Get request successfully executed"
      )
    );
});

const UpdateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User updation successfully"));
});

const UpdateAvatar = asyncHandler(async (req, res) => {
  const AvatartLocalPath = req.file?.path;

  if (!AvatartLocalPath) throw new ApiError(400, "Avatar file is missing");

  const Avatar = await UploadFileToCloudinary(AvatartLocalPath);

  if (!Avatar.url) {
    throw new ApiError(500, "Something went wrong while uploading Avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: Avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  const DeletedAvatar = await DeleteFileFromCloudinary(req.user.avatar);
  console.log(DeletedAvatar);

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Avatar updated successfully"));
});

// TODO:create this endpoint
const GetUserIdDetails = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username not found");
  }

  const Channel = await User.aggregate([
    {
      $match: {
        username: username,
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "Subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "SubscribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$Subscribers",
        },
        subscriptionCount: {
          $size: "$SubscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$Subscribers"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        coverImage: 1,
        isSubscribed: 1,
        subscriptionCount: 1,
        subscriberCount: 1,
      },
    },
  ]);

  if (!Channel?.length) {
    throw new ApiError(400, "User doesn't exsist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Channel[0], "Channel Festched successfully"));
});

export {
  GetUser,
  LogInUser,
  LogOutUser,
  RegisterUser,
  UpdateAvatar,
  GetUserIdDetails,
  UpdateUserDetails,
  ChangeCurrentPassword,
  regenerateRefreshToken,
};
