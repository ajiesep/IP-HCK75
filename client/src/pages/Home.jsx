import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const Home = () => {
  const trandingData = useSelector((state) => state.movieoData.bannerData);
  return (
    <div>
      <BannerHome />

      <div className="container px-3 mx-auto my-10">
        <h2 className="mb-2 text-xl font-bold lg:text-2xl">Trending Movie</h2>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6">
          {trandingData.map((data, index) => {
            return (
              <Card
                key={data.id}
                data={data}
                index={index + 1}
                trending={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
