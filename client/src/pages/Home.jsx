import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import axios from "axios";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const [nowPlayingData, setNowPlayingData] = useState([]);

  const fetchNowPlayingData = async () => {
    try {
      const response = await axios.get("movie/now_playing");
      fetchNowPlayingData(response.data.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNowPlayingData();
  }, []);

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} />
    </div>
  );
};

export default Home;
