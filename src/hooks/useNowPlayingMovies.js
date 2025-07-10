import { API_options } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { addNowPlayingMovies } from "../utils/movieSlice"



const useNowPlayingMovies = () => {
       const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_options) 
    
        const json =await data.json();
       
        dispatch(addNowPlayingMovies(json.results))
    }
     
    useEffect( () =>{
         getNowPlayingMovies();
    },[] )
}

export default useNowPlayingMovies;