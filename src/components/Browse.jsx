import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useDispatch, useSelector } from "react-redux";
import { removeGptMovieResult } from "../utils/gptslice";

const Browse = () => {

   const dispatch = useDispatch();
   const showGptSearch=useSelector(store => store.gpt.showGptSearch);
    
   useNowPlayingMovies();
   usePopularMovies();
   useTopRatedMovies();
   useTrendingMovies();
   useUpcomingMovies();

   if(!showGptSearch)
   {
     dispatch(removeGptMovieResult());
   }

    return(
       <div>
        <Header/>
          {showGptSearch ? (
            <GptSearch/>
             ) : (
            <> 
             <MainContainer/>
             <SecondaryContainer/>
            </>
          )} 
       </div>
       
    )}

export default Browse;    