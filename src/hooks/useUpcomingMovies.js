import { API_options } from "../utils/constants";
import { useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";

import { addUpcomingMovies } from "../utils/movieSlice"



const useUpcomingMovies = () => {
       const dispatch = useDispatch();
       
       const  upcomingMovies = useSelector(store => store.movies.upcomingMovies);

    const getUpcomingMovies = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_options) 
    
        const json =await data.json();
       
        dispatch(addUpcomingMovies(json.results))
    }
      useEffect( () =>{
        if(!upcomingMovies) getUpcomingMovies();
    },[] )
}

export default useUpcomingMovies;  