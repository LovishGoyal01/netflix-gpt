import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movie",
    initialState:{
        nowPlayingMovies:null,
        trailorVideo:null,
        },
    reducers:{
        addNowPlayingMovies:(state,action) =>{
            state.nowPlayingMovies = action.payload;
        },
        addTrailorVideo:(state,action) => {
            state.trailorVideo =action.payload;
        }

    }
})

export const { addNowPlayingMovies , addTrailorVideo } = movieSlice.actions;

export default movieSlice.reducer;