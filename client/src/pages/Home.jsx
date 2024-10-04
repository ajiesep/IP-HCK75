import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingMovie } from "../utilities/api";
import { setBannerData, setNowPlayingData } from "../store/movieoSlice";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import BannerHome from "../components/BannerHome";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const dispatch = useDispatch();

  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const nowPlayingData = useSelector(
    (state) => state.movieoData.nowPlayingData
  );
  const { data } = useFetch("movie/now_playing");

  const fetchNowPlayingData = async () => {
    try {
      const response = await getNowPlayingMovie();
      response.data.results;
    } catch (error) {
      console.error("Error fetching Now Playing data", error);
    }
  };

  const fetchBannerData = async () => {
    try {
      const response = await axios.get("");
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.error("Error fetching banner data", error);
    }
  };

  useEffect(() => {
    fetchNowPlayingData();
    fetchBannerData();
  }, [dispatch]);

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trendingData}
        heading="Trending"
        trending={true}
      />
      <HorizontalScrollCard
        data={nowPlayingData}
        heading="Now Playing"
        media_type={"movie"}
      />
    </div>
  );
};

export default Home;
