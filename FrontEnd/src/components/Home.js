import Header from "./Header";
import ArticleCard from "./ArticleCard";
import { alertInfo } from "../utils/Alert";
import "react-custom-alert/dist/index.css"; // import css file from root.
import { ClipboardPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  // const alertInfo = (alertMsg) => toast.info(alertMsg);
  // const alertSuccess = () => toast.success("success");
  // const alertError = () => toast.error("error");

  return (
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
          <ArticleCard
            size="large"
            Description={{
              title: "Relation Between US and China",
              summary:
                "The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....",
            }}
          />
          <ArticleCard
            Description={{
              title: "Relation Between US and China",
              summary:
                "The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....",
            }}
          />
          <ArticleCard
            Description={{
              title: "Relation Between US and China",
              summary:
                "The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....",
            }}
          />
          <ArticleCard
            Description={{
              title: "Relation Between US and China",
              summary:
                "The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....",
            }}
          />
          <ArticleCard
            Description={{
              title: "Relation Between US and China",
              summary:
                "The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....",
            }}
          />
          <ArticleCard
            size="large"
            Description={{
              title: "Relation Between US and China",
              summary:
                "The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....",
            }}
          />
        </div>
      </div>
      <div className="Add_New_Article  bg-white/30 backdrop-blur-md w-20 h-20 rounded-full flex justify-center items-center fixed top-[80vh] right-7">
        <Link to={`/upload`} className=" scale-150  ">
          <ClipboardPlus />
        </Link>
      </div>
    </div>
  );
};

export default Home;
