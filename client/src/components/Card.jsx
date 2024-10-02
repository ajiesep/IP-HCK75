import React from "react";

const Card = ({ data, trending, index }) => {
  const imageURL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="w-full max-w-[230px] h-80 overflow-hidden rounded relative">
      <img src={imageURL + data?.poster_path} alt="" />
      <div className="absolute top-4">
        {trending && (
          <div className="px-4 py-1 overflow-hidden rounded-r-full bg-black/60 backdrop-blur-3xl">
            #{index}Trending
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
