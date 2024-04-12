import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { alertSuccess, alertError } from "../utils/Alert";

const UploadPage = () => {
  const [article, setArticle] = useState({
    title: String,
    summery: String,
    description: String,
  });

  const [thumbnail, setThumbnail] = useState();

  const HandelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const HandelImage = (event) => {
    console.log(event.target.files);
    setThumbnail(event.target.files);
    console.log(thumbnail);
  };

  const UploadArticle = async () => {
    try {
      // Handle image upload (assuming 'image' is a file object)
      // const formData = new FormData();
      // if (thumbnail) {
      //   const imageFilename = thumbnail.name || "image.jpg";
      //   formData.append("image", thumbnail, imageFilename);
      // }

      // AccessToken retrieval and potential security improvement
      const AccessToken = localStorage.getItem("AccessToken");

      // Prepare article data object
      const articleData = {
        title: article.title, // Assuming 'article' is your state object
        summery: article.summery,
        description: article.description,
      };

      // Axios request with headers (including Authorization)
      const response = await axios.post(
        "http://localhost:3000/api/v1/article/",
        articleData,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            "Content-Type": "application/json", // For JSON content
          },
        }
      );

      if (response.status !== 201) {
        // Check for successful status code
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result = response.data;
      console.log("Article and image upload successful:", result);
      alertSuccess(result.message);
    } catch (error) {
      console.error("Error uploading article and image:", error);
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alertError(error.response.data.message);
      }
    }
  };

  return (
    <div className="h-screen bg-redBg text-white">
      {/* <Header/> */}
      <h1 className="text-3xl text-center font-serif p-7 ">
        Upload Your Article
      </h1>
      <div>
        <form className="w-screen h-full flex flex-wrap justify-center ">
          <div className="Title w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Title
            </label>
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-200 text-sm rounded-lg  block w-full p-2.5   dark:placeholder-gray-400 dark:text-text-gray-200 font-Rajdhani"
              placeholder="Title "
              name="title"
              value={article.title}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="Summery w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Summery
            </label>
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-200 text-sm rounded-lg  block w-full p-2.5   dark:placeholder-gray-400 dark:text-text-gray-200 font-Rajdhani"
              placeholder="Short summery for the article"
              name="summery"
              value={article.summery}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="Thumbnail w-72 m-5">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Choose thumbnail
            </label>
            <input
              type="file"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Rajdhani"
              accept="image/*"
              name="thumbnail"
              onChange={HandelImage}
              required
            />
          </div>
          <div className="Description w-fit h-full m-5 ">
            <label className="block mb-2 text-lg font-semibold w-fit text-white dark:text-gray-300 font-Philosopher">
              Description
            </label>
            <textarea
              type="text"
              className="w-[80vw] h-[50vh] bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-200 text-sm rounded-lg  block p-2.5   dark:placeholder-gray-400 dark:text-text-gray-200 font-Rajdhani"
              placeholder="vivek123"
              name="description"
              value={article.description}
              onChange={HandelInputChange}
              required
            />
          </div>
        </form>
        <div className="RegisterButton flex justify-center">
          <button
            className="bg-red-500/30 border border-l-2 border-b-2 border-red-500/50 w-72 mx-5 my-3 py-2 text-white text-lg rounded-2xl hover:scale-105 hover:bg-red-500 transition duration-200 ease-in-out"
            onClick={UploadArticle}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
