import { API_options } from "../utils/constants";
import { useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";

import { addTopRatedMovies } from "../utils/movieSlice"



const useTopRatedMovies = () => {
       const dispatch = useDispatch();

      const  topRatedMovies = useSelector(store => store.movies.topRatedMovies);
    
    const getTopRatedMovies = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_options) 
    
        const json =await data.json();
       
        dispatch(addTopRatedMovies(json.results))
    }
      useEffect( () =>{
      if(!topRatedMovies)   getTopRatedMovies();
    },[] )
}

export default useTopRatedMovies;  