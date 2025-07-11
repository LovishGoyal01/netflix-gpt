import Header from "./Header";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
    
   useNowPlayingMovies();
   usePopularMovies();
   useTopRatedMovies();
   useTrendingMovies();
   useUpcomingMovies();

    return(
       <div>
        <Header/>
        <MainContainer/>
        <SecondaryContainer/>
       
       </div>
       
    )}

export default Browse;    