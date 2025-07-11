import { createSlice } from "@reduxjs/toolkit";


const gptslice=createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
    },
    reducers:{
       toogleGptSearchView: (state,action) => {
          state.showGptSearch = !state.showGptSearch;
       }   
    } 

})

export const  {toogleGptSearchView} = gptslice.actions;

export  default gptslice.reducer;