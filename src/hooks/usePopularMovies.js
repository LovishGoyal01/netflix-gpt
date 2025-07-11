import { API_options } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { addPopularMovies } from "../utils/movieSlice"



const usePopularMovies = () => {
       const dispatch = useDispatch();

    const getPopularMovies = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_options) 
    
        const json =await data.json();
       
        dispatch(addPopularMovies(json.results))
    }
     
    useEffect( () =>{
         getPopularMovies();
    },[] )
}

export default usePopularMovies;