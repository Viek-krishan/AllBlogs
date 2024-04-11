const BigCard = () => {
  return (
    <div className="w-3/6 h-[40vh] overflow-hidden rounded-xl m-4 p-2 hover:scale-y-105 hover:h-[50vh]   hover:-translate-y-10 transition duration-300 ease-in-out   ">
      <div className="Thumbnail w-full h-[35vh] rounded-lg bg-gray-600  ">
        <img src="" className="w-full h-full rounded-xl " />
      </div>
      <div className="Details">
        <h1 className="Title font-semibold ">Relation Between US and China</h1>
        <h3 className="Short-Summery text-xs ">
          The relation between the US and China is getting worse day by day. US
          has warned China for it's activity around south China sea.....
        </h3>
        <button className="text-red-500 underline">Read more</button>
      </div>
    </div>
  );
};

// export default BigCard;

const ArticleCard = () => {
  return (
    <div className="w-1/6 h-[24vh] overflow-hidden rounded-xl m-4 p-2 hover:scale-y-105 hover:h-[40vh]   hover:-translate-y-10 transition duration-300 ease-in-out   ">
      <div className="Thumbnail w-full h-[20vh] rounded-lg bg-gray-600  ">
          <img src=""  className="w-full h-full rounded-xl "/>
      </div>
      <div className="Details">
          <h1 className="Title font-semibold ">Relation Between US and China</h1>
          <h3 className="Short-Summery text-xs ">The relation between the US and China is getting worse day by day. US has warned China for it's activity around south China sea.....</h3>
          <button className="text-red-500 underline">Read more</button>
      </div>
    </div>
  );
};

export default ArticleCard;
