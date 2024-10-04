import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageURL: "",
  nowPlayingData: [],
};

export const movieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
    setNowPlayingData: (state, action) => {
      state.nowPlayingData = action.payload;
    },
  },
});

export const { setBannerData, setImageURL, setNowPlayingData } =
  movieoSlice.actions;

export default movieoSlice.reducer;
