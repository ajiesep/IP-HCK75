import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";

function BannerHome() {
  const bannerData = useSelector((state) => state.movieoData.bannerData);

  const imageURL = "https://image.tmdb.org/t/p/original";

  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData.length]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => (
          <div
            key={data.id + "BannerHome" + index}
            className={`min-w-full min-h-[450px] overflow-hidden relative group transition-all duration-500 ease-in-out`}
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            <div className="w-full h-full">
              <img
                src={imageURL + data.backdrop_path}
                alt={data.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Next and Previous buttons */}
            <div className="absolute top-0 items-center justify-between hidden w-full h-full px-5 group-hover:flex">
              <button
                onClick={handlePrevious}
                className="z-10 text-2xl bg-zinc-800 text-zinc-400"
              >
                <VscTriangleLeft />
              </button>
              <button
                onClick={handleNext}
                className="z-10 text-2xl bg-zinc-800 text-zinc-400"
              >
                <VscTriangleRight />
              </button>
            </div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-zinc-950 to-transparent"></div>
            <div className="container mx-auto">
              <div className="absolute bottom-0 w-full max-w-md px-3">
                <h2 className="text-2xl font-bold lg:text-4xl text-zinc-100 drop-shadow-2xl">
                  {data.title}
                </h2>
                <p className="my-2 text-ellipsis line-clamp-3">
                  {data.overview}
                </p>
                <div className="flex items-center gap-4">
                  <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                  <p>View: {Number(data.popularity).toFixed(0)}</p>
                </div>
                <button className="px-4 py-2 mt-4 font-bold text-black transition-all rounded shadow-md bg-zinc-100 hover:bg-gradient-to-l from-zinc-800 to-zinc-600 hover:scale-105">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BannerHome;
