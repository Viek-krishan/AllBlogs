import { Link, useNavigate } from "react-router-dom";

const ArticleCard = ({ size = "small", Description }) => {
  // Variables
  const navigate = useNavigate();
  const hoverHeight = size === "small" ? "40vh" : "";

  const navigateToArticle = () => {
    navigate("/article-page");
  };

  return (
    <Link
      to={`/article-page`}
      className={`m-4 p-4 bg-white/20 backdrop-blur-lg border-l-2 border-b-2 border-white/20  overflow-hidden rounded-xl
       w-${size === "small" ? "1/6" : "1/2"} h-[${
         size === "small" ? "24vh" : "55vh"
       }] hover:h-[${hoverHeight}] 
        hover:-translate-y-5 transition duration-300 ease-in-out hover:scale-y-105`}
    >
      <div
        className={`Thumbnail w-full rounded-lg bg-gray-600 h-${
          size === "small" ? "[25vh]" : "[40vh]"
        }`}
      >
        <img
          src="https://res.cloudinary.com/dur4pixxs/image/upload/f_auto,q_auto/f5mktcqqqmtrmggyexho"
          alt="thumbnail"
          className="w-full h-full rounded-xl"
        />
      </div>
      <div className="Details">
        <h1 className="Title font-semibold">{Description.title}</h1>
        <h3 className="Short-Summery text-xs">{Description.summary}</h3>
        <button className="text-red-500 underline" onClick={navigateToArticle}>
          Read more
        </button>
      </div>
    </Link>
  );
};

export default ArticleCard;
