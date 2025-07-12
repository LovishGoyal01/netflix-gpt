import { API_options } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";

import { addNowPlayingMovies } from "../utils/movieSlice"



const useNowPlayingMovies = () => {
      
    const dispatch = useDispatch();

    const nowPlayinMovies = useSelector(store => store.movies.nowPlayinMovies);

    const getNowPlayingMovies = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_options) 
    
        const json =await data.json();
       
        dispatch(addNowPlayingMovies(json.results))
    }
     
    useEffect( () =>{
        if(!nowPlayinMovies) getNowPlayingMovies();
    },[] )
}

export default useNowPlayingMovies;