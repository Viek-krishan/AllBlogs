import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  // All Variables declaration for this components
  const [avatar, setAvatar] = useState();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    username: "",
    age: Number,
    passkey: "",
  });

  // All function defination

  const HandelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const HandelImage = (event) => {
    console.log(event.target.files);
    setAvatar(event.target.files);
    console.log(avatar);
  };

  const Register = async () => {
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(user),
        redirect: "follow",
      };

      console.log(requestOptions);

      fetch("http://localhost:3000/api/v1/user/register", requestOptions)
        .then((response) => response.json())
        .then((result) => alertInfo(result.data.message))
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
      alertError(error.message);
    }
  };

  return (
    <div className="text-white flex justify-center w-full h-fit  ">
      <section className="Form_side ">
        <div className="Google_signIn m-auto mt-10 px-3 w-fit flex justify-center items-center rounded-full  border-b-2 border-l-2 border-white/30 bg-white/30 backdrop-blur-lg  hover:scale-110 hover:drop-shadow-xl transition duration-150 ease-in-out cursor-pointer">
          <h3 className="ffont-medium text-center ">Register with google </h3>
          <img
            src="https://th.bing.com/th/id/R.c8bf7c087ca9793d094042845707ffac?rik=fjZN1AYH30vXIw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fgoogle%2fgoogle_PNG19635.png&ehk=ZmsumEtoeJQhKoUzQTZO2TEbYPBu0%2b7EFdjmJ3qljls%3d&risl=&pid=ImgRaw&r=0"
            alt=""
            className="w-10"
          />
        </div>

        <h1 className="text-center m-10 text-lg">--- Register ---</h1>

        <form className="Form flex flex-wrap justify-center">
          <div className="UserName w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              User name
            </label>
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              placeholder="vivek123"
              name="username"
              value={user.username}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="fullName w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Full Name
            </label>
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              placeholder="vivek krishan"
              name="fullName"
              value={user.fullName}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="email w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Email
            </label>
            <input
              type="email"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              placeholder="user@gmail.com"
              name="email"
              value={user.email}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="age w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Age
            </label>
            <input
              type="number"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              placeholder="20"
              name="age"
              value={user.age}
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
          <div className="ImageInput w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Choose Profile Pic
            </label>
            <input
              type="file"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              accept="image/*"
              name="avatar"
              onChange={HandelImage}
              required
            />
          </div>
        </form>

        <div className="Terms&Condition flex justify-center">
          <input type="checkbox" id="agree" className="m-2" />
          <h3 className="text-center">I agreed to the terms & conditions</h3>
        </div>

        <div className="RegisterButton flex justify-center">
          <button
            className="bg-white/30 border border-l-2 border-b-2 border-red-500/30 w-72 mx-5 my-3 py-2 text-white text-lg rounded-2xl hover:scale-105 transition duration-200 ease-in-out"
            onClick={Register}
          >
            Register
          </button>
        </div>
        <div className="Sign_UP_Options">
          <h3 className="text-center">
            Don't have an account ?{" "}
            <Link to={`/login`} className="text-blue-400">
              Log In
            </Link>{" "}
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Register;
