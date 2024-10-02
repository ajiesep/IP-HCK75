import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MobileNavigation from "./components/MobileNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getConfigurasionMovies, getTrendingMovies } from "./utilities/api";
import { setBannerData, setImageURL } from "./store/movieoSlice";

function App() {
  const dispatch = useDispatch();

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
    fecthConfigurasion();
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
