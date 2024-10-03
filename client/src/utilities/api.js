import axios from "axios";

const getTrendingMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );
  console.log(response, "?????????????????");

  return response;
};

const endpoint = async () => {
  const response = await axios.get("https://api.themoviedb.org/3", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
  return response;
};

const getConfigurasionMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/configuration",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );
  return response;
};

const getSearchMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/collection",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );
  return response;
};

const getNowPlayingMovie = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );
  return response;
};

export {
  getTrendingMovies,
  endpoint,
  getConfigurasionMovies,
  getSearchMovies,
  getNowPlayingMovie,
};
