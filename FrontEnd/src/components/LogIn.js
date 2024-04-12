import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { alertError, alertInfo } from "../utils/Alert";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const LogIn = () => {
  // Utility variables
  const Dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // utility Functions
  const HandelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({ ...user, [name]: value });
    // console.log(user);
  };

  // const LogInFn = async () => {
  //   let data = JSON.stringify(user);
  //   let url = "http://localhost:3000/api/v1/user/login";

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     // url: "http://localhost:3000/api/v1/user/login",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // data: data,
  //   };

  //   await axios
  //     .post(url, data, config)
  //     .then((response) => {
  //       alertInfo(response.data.message);

  //       localStorage.setItem("AccessToken", response.data.data.AccessToken);
  //       localStorage.setItem("RefreshToken", response.data.data.RefreshToken);
  //       const refreshTK = localStorage.getItem("RefRefreshToken");
  //       console.log(localStorage.getItem("RefRefreshToken"));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alertError(error.message);
  //     });
  // };

  const LogInFn = async () => {
    try {
      const data = JSON.stringify(user);
      const url = "http://localhost:3000/api/v1/user/login";

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alertInfo(response.data.message);

      // Store tokens in local storage using correct property names
      localStorage.setItem("AccessToken", response.data.data.AccessToken);
      localStorage.setItem("RefreshToken", response.data.data.RefreshToken);

      // // Verify storage using the correct property names
      console.log(localStorage.getItem("AccessToken"));

      // Storing data inside store
      Dispatch(removeUser());
      Dispatch(addUser(response.data.data.user));
    } catch (error) {
      console.error(error);
      alertError(error.message);
    }
  };



  return (
    <div className="text-white flex  w-full h-full ">
      <section className="Form_side   ">
        <div className="Google_signIn m-auto mt-10 px-3 w-fit flex justify-center items-center rounded-full  border-b-2 border-l-2 border-white/30 bg-white/30 backdrop-blur-lg  hover:scale-110 hover:drop-shadow-xl transition duration-150 ease-in-out cursor-pointer">
          <h3 className="ffont-medium text-center ">Log in with google </h3>
          <img
            src="https://th.bing.com/th/id/R.c8bf7c087ca9793d094042845707ffac?rik=fjZN1AYH30vXIw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgoogle%2fgoogle_PNG19635.png&ehk=ZmsumEtoeJQhKoUzQTZO2TEbYPBu0%2b7EFdjmJ3qljls%3d&risl=&pid=ImgRaw&r=0"
            alt=""
            className="w-10"
          />
        </div>

        <h1 className="text-center mt-2 mb-5 text-lg">--- Login ---</h1>

        <form className="Form  flex flex-col justify-center items-center">
          <div className="UserName w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              User name / Email
            </label>
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              placeholder="Vivek"
              name="username"
              value={user.username}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="password w-72 m-5">
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-semibold w-fit text-gray-300 dark:text-gray-300 font-Philosopher"
            >
              Password
            </label>
            <input
              type="password"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              placeholder="****"
              name="passkey"
              value={user.passkey}
              onChange={HandelInputChange}
              required
            />
          </div>
        </form>

        <div className="RegisterButton flex justify-center">
          <button
            className="bg-white/30 border border-l-2 border-b-2 border-red-500/30 w-72 mx-5 my-3 py-2 text-white text-lg rounded-2xl hover:scale-105 transition duration-200 ease-in-out"
            onClick={LogInFn}
          >
            Log In
          </button>
        </div>
        <div className="Sign_UP_Options">
          <h3 className="text-center">
            Don't have an account ?{" "}
            <Link to={`/register`} className="text-blue-400">
              Register
            </Link>{" "}
          </h3>
        </div>
      </section>
    </div>
  );
};

export default LogIn;
