import { useEffect } from "react";
import { API_options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailorVideo } from "../utils/movieSlice";

const useMovieTrailor = (movieId) => {
     
    const dispatch = useDispatch();

    const  trailorVideo = useSelector(store => store.movies.trailorVideo);

    const getMovieVideo = async () =>{
     
        const data = await fetch( "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_options)
    
        const json = await data.json();
        
        const filterddata = json.results.filter(video => video.type=== "Trailor");
    
        const trailor = filterddata.length? filterddata[0]: json.results[0];
   
        dispatch(addTrailorVideo(trailor))      
    }
    useEffect( () => {
      if(!trailorVideo) getMovieVideo();
    },[])
}

export default useMovieTrailor;