import { createSlice } from "@reduxjs/toolkit";

const configslice = createSlice({
    name:"config",
    initialState:{
        lang:"en"
    },
    reducers:{
        changeLanguage:(state,action) =>{
            state.lang = action.payload;
        }
    }

});

export default configslice.reducer;

export const {changeLanguage} = configslice.actions;
