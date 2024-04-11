import mongoose, { isValidObjectId } from "mongoose";
import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { UploadFileToCloudinary } from "../utils/Cloudinary.js";

const getAllArticle = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  // console.log(req);
  if (!userId) throw new ApiError(401, "User id not found");

  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found ! Invalid user id");

  const allArticle = await Article.find({
    owner: userId,
  });

  res.status(201).json(new ApiResponse(201, allArticle, "Got it"));
});

const publishArticle = asyncHandler(async (req, res) => {
  const { title, summery, description } = req.body;

  console.log(req);
  if (!title || !summery || !description)
    throw new ApiError(201, "All details are required");

  const thumbnailLocalPath = req.file?.path;

  let Thumbnail;
  if (thumbnailLocalPath) {
    Thumbnail = await UploadFileToCloudinary(AvatartLocalPath);

    if (!Thumbnail)
      throw new ApiError(
        401,
        "Something went wrong with Avatar!!, Please upload once again"
      );
  }

  const newArticle = await Article.create({
    title,
    summery,
    description,
    thumbnail: Thumbnail?.url,
    owner: req.user._id,
  });

  if (!newArticle)
    throw new ApiError(500, "something went wrong while uploading article");

  res
    .status(201)
    .json(new ApiResponse(201, newArticle, "Article uploaded successfully"));
});

const getArticleById = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  //TODO: get article by id

  // console.log(req);
  if (!articleId) throw new ApiError(401, "article Id not found");

  const article = await Article.findById(articleId);

  if (!article)
    throw new ApiError(
      404,
      "Article not found !!! Either article id is incorrect or article might be deleted"
    );

  res.status(201).json(new ApiResponse(201, article, "Article found"));
});

const updateArticle = asyncHandler(async (req, res) => {
  const { articleId, title, summery, description } = req.params;

  if (!articleId) throw new ApiError(401, "Article id not found");

  if (!title || !summery || !description)
    throw new ApiError(401, "All fields must be field");

  const article = await Article.findById(articleId);

  if (!article) throw new ApiError(404, "Article not found");

  const newArticle = await Article.findByIdAndUpdate(
    articleId,
    {
      $set: {
        title,
        summery,
        description,
      },
    },
    {
      new: true,
    }
  );

  if (!newArticle)
    throw new ApiError(
      500,
      "Something went wrong while updating the article ! Please try again"
    );

  res.status(201).json(201, newArticle, "Updation completed");
});

const deleteArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  //TODO: delete article

  if (!articleId) throw new ApiError(401, "Article id not found");

  const deletedArticle = await Article.findByIdAndDelete(articleId);

  if (!deleteArticle)
    throw new ApiError(
      500,
      "Something went wrong while deleting ! Please try again"
    );

  res
    .status(201)
    .json(new ApiResponse(201, deleteArticle, "Deletion completed"));
});

export {
  getAllArticle,
  getArticleById,
  publishArticle,
  updateArticle,
  deleteArticle,
};
