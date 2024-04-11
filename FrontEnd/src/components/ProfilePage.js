import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Profile = () => {
  const ArticleCard = () => {
    return (
      <Link className=" w-fit flex flex-col justify-center items-center ml-10 m-5  ">
        <div className="w-[20vw] h-56  rounded-2xl   bg-white/30 border-l-2 border-b-2 border-red-300/20 backdrop-filter backdrop-blur-xl hover:scale-110 transition duration-200 ease-in-out  flex flex-col items-center">
          <div className=" m-2 rounded-xl overflow-hidden flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dur4pixxs/image/upload/f_auto,q_auto/f5mktcqqqmtrmggyexho"
              alt=""
              className="h-full"
            />
          </div>
          <div className="h-10">
            <h1 className="text-xl">Relation Between US and China</h1>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-redBg  w-full">
      <Header />
      <div className="text-white h-[95vh] ">
        <div className="ProfileCard bg-white/30 backdrop-filter backdrop-blur-lg m-auto h-[60vh] w-[65vw] relative top-[15vh] rounded-2xl   ">
          <div className="CardHeader w-full flex h-fit ">
            <section className="Follower w-1/3 flex justify-evenly m-3        ">
              <div>
                <h1 className="font-semibold text-sm font-serif text-center">
                  500k
                </h1>
                <h1 className="font-extralight text-sm font-serif">
                  Followers
                </h1>
              </div>
              <div>
                <h1 className="font-semibold text-sm font-serif text-center">
                  450
                </h1>
                <h1 className="font-extralight text-sm font-serif">
                  Following
                </h1>
              </div>
              <div>
                <h1 className="font-semibold text-sm font-serif text-center">
                  55
                </h1>
                <h1 className="font-extralight text-sm font-serif">Posts</h1>
              </div>
            </section>
            <section className="DP w-1/3 h-fit flex justify-center   ">
              <div className="DP bg-gray-100  w-44 h-44 rounded-full relative -top-14 drop-shadow-lg hover:drop-shadow-2xl transition duration-200 ease-in-out ">
                <img src="" alt="" className="" />
              </div>
            </section>
            <section className="Follow_Connect w-1/3  h-fit">
              <button className="bg-red-500 m-4 px-4 py-1 rounded-lg drop-shadow-lg text-white hover:scale-105 hover:drop-shadow-2xl transition duration-200 ease-in-out">
                Follow
              </button>
              <button className="bg-red-500 m-4 px-4 py-1 rounded-lg drop-shadow-lg text-white hover:scale-105 hover:drop-shadow-2xl transition duration-200 ease-in-out">
                Message
              </button>
            </section>
          </div>
          <div className="Details">
            <div>
              <h1 className="text-2xl font-serif text-center text-gray-200">
                Vivek Krishan , 20
              </h1>
              <h3 className="text-sm text-center font-serif text-gray-400">
                Ranchi, India
              </h3>
              <h6 className="text-center text-sm text-gray-400">
                --------------------------------------------------------------------------------------------------------------------------
              </h6>
              <p className="mx-20 m-10 text-sm text-center text-gray-300">
                I'm a full-stack developer fluent in the MERN stack, crafting
                stunning front-ends with React and pixel-perfect CSS, while
                ensuring rock-solid backend performance with Node.js, Express,
                and MongoDB. I bridge the gap between front and back like a
                seasoned architect, building high-quality, scalable web
                applications you can trust. More than just code, I bring strong
                communication, a passion for learning, and a dedication to
                solving problems with creative solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10">
        <h1 className="text-3xl font-serif ">All Articles</h1>
      </div>
      <div className="AllArticles flex flex-wrap">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
};

export default Profile;
