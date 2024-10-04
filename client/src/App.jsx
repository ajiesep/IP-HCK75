import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MobileNavigation from "./components/MobileNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getConfigurasionMovies,
  getTrendingMovies,
  getNowPlayingMovie,
} from "./utilities/api";
import {
  setBannerData,
  setImageURL,
  setNowPlayingData,
} from "./store/movieoSlice";

function App() {
  const dispatch = useDispatch();
  // ngambil data yg trending
  const fetchTrendingData = async () => {
    try {
      const response = await getTrendingMovies();
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTrendingData();
  }, []);
  // ngambil data configurasi
  async function fecthConfigurasion() {
    try {
      const response = await getConfigurasionMovies();
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fecthConfigurasion();
    // fecthConfigurasion();
  }, []);

  // ngambil data now playing
  const fetchNowPlayingData = async () => {
    try {
      const response = await getNowPlayingMovie(); // Assuming this is the correct API call
      dispatch(setNowPlayingData(response.data.results)); // Dispatch with the response data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNowPlayingData();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
