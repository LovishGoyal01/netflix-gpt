import { createSlice } from "@reduxjs/toolkit";

const gptslice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toogleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    removeGptMovieResult: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const {  toogleGptSearchView, addGptMovieResults, removeGptMovieResult,} = gptslice.actions;

export default gptslice.reducer;
