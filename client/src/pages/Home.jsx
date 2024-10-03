// import React, { useEffect, useState } from "react";
// import BannerHome from "../components/BannerHome";
// import { useSelector, useDispatch } from "react-redux";
// import HorizontalScrollCard from "../components/HorizontalScrollCard";
// import { getNowPlayingMovie } from "../utilities/api";
// import { setNowPlayingData, setBannerData } from "../store/movieoSlice";
// import axios from "axios";

// const Home = () => {
//   const dispatch = useDispatch();
//   // const trendingData = useSelector((state) => state.movieo.bannerData);
//   const trendingData = useSelector((state) => state.movieo.bannerData || []);
//   // const nowPlayingData = useSelector((state) => state.movieo.nowPlayingData);
//   const nowPlayingData = useSelector(
//     (state) => state.movieo.nowPlayingData || []
//   );
//   // const [nowPlayingData, setNowPlayingData] = useState([]);

//   const fetchNowPlayingData = async () => {
//     try {
//       const response = await getNowPlayingMovie();
//       // const response = await axios.get("movie/now_playing");
//       setNowPlayingData(response.data.results);
//       // console.log("Now Playing Movies Response:", response.data); // Debugging log
//       dispatch(setNowPlayingData(response.data.data.results));
//     } catch (error) {
//       console.error("Error fetching Now Playing data", error);
//     }
//   };

//   useEffect(() => {
//     fetchNowPlayingData();
//   }, []);

//   const fetchBannerData = async () => {
//     try {
//       // Fetch the actual banner data from an API endpoint
//       const response = await axios.get("movie/now_playing");
//       dispatch(setBannerData(response.data.data.results)); // Dispatch to set bannerData in Redux store
//     } catch (error) {
//       console.error("Error fetching trending data", error);
//     }
//   };

//   useEffect(() => {
//     fetchBannerData();
//   }, []);

//   // console.log("Trending Data:", trendingData);
//   // console.log("Now Playing Data:", nowPlayingData);

//   return (
//     <div>
//       <BannerHome />
//       <HorizontalScrollCard
//         data={trendingData}
//         heading={"Trending"}
//         trending={true}
//       />
//       <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} />
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import BannerHome from "../components/BannerHome";
// import { useSelector, useDispatch } from "react-redux";
// import HorizontalScrollCard from "../components/HorizontalScrollCard";
// import { getNowPlayingMovie } from "../utilities/api";
// import { setNowPlayingData, setBannerData } from "../store/movieoSlice";
// import axios from "axios";

// const Home = () => {
//   // const dispatch = useDispatch();

//   const trendingData = useSelector((state) => state.movieoData);
//   const [nowPlayingData, setNowPlayingData] = useState([]);

//   const fetchNowPlayingData = async () => {
//     try {
//       const response = await axios.get("/movie/now_playing");
//       setNowPlayingData(response.data.results);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     fetchNowPlayingData();
//   }, []);
//   // Use fallback for both bannerData and nowPlayingData
//   const trendingData = useSelector((state) => {
//     console.log(state, "<<<<<<<<<<<<<<<<<<<<<<<<<");
//     return state.movieo.bannerData;
//   });
//   const nowPlayingData = useSelector(
//     (state) => state.movieo.nowPlayingData || []
//   );

//   const fetchNowPlayingData = async () => {
//     try {
//       const response = await getNowPlayingMovie();
//       dispatch(setNowPlayingData(response.data.results)); // Update nowPlayingData in Redux store
//     } catch (error) {
//       console.error("Error fetching Now Playing data", error);
//     }
//   };

//   const fetchBannerData = async () => {
//     try {
//       // Fetch banner data from an API endpoint (adjust the URL as necessary)
//       const response = await axios.get("/movie/now_playing");
//       console.log(response.data, "!!!!!!!!!!!!!!");
//       dispatch(setBannerData(response.data.results)); // Dispatch to set bannerData in Redux store
//     } catch (error) {
//       console.error("Error fetching trending data", error);
//     }
//   };

//   useEffect(() => {
//     fetchNowPlayingData();
//     fetchBannerData();
//   }, [dispatch]);

//   return (
//     <div>
//       <BannerHome />
//       <HorizontalScrollCard
//         data={trendingData}
//         heading={"Trending"}
//         trending={true}
//       />
//       <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} />
//     </div>
//   );
// };

// export default Home;

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
      <HorizontalScrollCard data={nowPlayingData} heading="Now Playing" />
    </div>
  );
};

export default Home;
