import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movie",
    initialState:{
        nowPlayingMovies:null,
        trailorVideo:null,
        popularMovies:null,
        topRatedMovies:null,
        trendingMovies:null,
        upcomingMovies:null,
        },
    reducers:{
        addNowPlayingMovies:(state,action) =>{
            state.nowPlayingMovies = action.payload;
        },
        addTrailorVideo:(state,action) => {
            state.trailorVideo =action.payload;
        },
        addPopularMovies:(state,action) =>{
            state.popularMovies = action.payload;
        },
        addTopRatedMovies:(state,action) =>{
            state.topRatedMovies = action.payload;
        },
        addTrendingMovies:(state,action) =>{
            state.trendingMovies = action.payload;
        },
        addUpcomingMovies:(state,action) =>{
            state.upcomingMovies = action.payload;
        },

    }
})

export const { addNowPlayingMovies , addTrailorVideo ,addPopularMovies,addTopRatedMovies,addTrendingMovies,addUpcomingMovies} = movieSlice.actions;

export default movieSlice.reducer;