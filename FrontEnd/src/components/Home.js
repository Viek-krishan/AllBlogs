import Header from "./Header";
import ArticleCard from "./ArticleCard";
import { alertInfo, alertSuccess } from "../utils/Alert";
import "react-custom-alert/dist/index.css"; // import css file from root.
import { ClipboardPlus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import HomeShimmer from "../utils/HomeShimmer";

const Home = () => {
  const [allArticles, setAllArticles] = useState([]);

  // Utility functions
  const getAllArticle = async () => {
    try {
      let data = "";

      const AccessToken = localStorage.getItem("AccessToken");
      const RefreshToken = localStorage.getItem("RefreshToken");

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/v1/article/get-all-article",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
        data: data,
      };

      const Data = await axios
        .request(config)
        .then((response) => {
          console.log(response.data.data);
          alertSuccess(response.data.message);
          setAllArticles(response.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });

      console.log("data from home", Data);
    } catch (error) {
      console.error("Error uploading article and image:", error);
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alertError(error.response.data.message);
      }
    }
  };

  useEffect(async () => {
    await getAllArticle();
  }, []);

  return allArticles.length === 0 ? (
    <HomeShimmer />
  ) : (
    <div className="h-fit w-screen bg-redBg opacity-95 relative">
      <Header />

      <div>
        <section className="Title mt-32 m-20  flex flex-col justify-center items-center">
          <h1 className="text-[40px] text-center font-bold ">
            The Daily Globe:
            <br /> Spin It Like You Mean It (With News)
          </h1>
          <h3 className="text-center w-1/3 text-sm font-extralight">
            The Daily Globe: Go beyond the headlines. We deliver sharp analysis,
            fresh perspectives, and the news that matters - all with a healthy
            dose of wit.
          </h3>
        </section>
        <div className="AllArticles w-full flex flex-wrap justify-center ">
          {/* { <ArticleCard
            size="large"
            Description={{
              title: "Relation Between US and China",
              summary:
                "The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....",
            }}
          />
          } */}
          {allArticles.map((article, index) => {
            return index === 2 || index === 3 ? (
              <ArticleCard
              key={index}
                size="large"
                Description={{
                  title: article.title,
                  summary: article.summery,
                }}
              />
            ) : (
              <ArticleCard
              key={index}
                Description={{
                  title: article.title,
                  summary: article.summery,
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="Add_New_Article  bg-white/30 backdrop-blur-md w-20 h-20 rounded-full flex justify-center items-center fixed top-[80vh] right-7">
        <Link to={`/upload`} className=" scale-150  ">
          <ClipboardPlus />
        </Link>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-red-500 px-5 py-3 rounded-full hover:scale-105 transition duration-150 ease-in-out "
          onClick={getAllArticle}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Home;
