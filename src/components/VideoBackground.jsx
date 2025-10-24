import { useSelector } from "react-redux";
import useMovieTrailor from "../hooks/useMovietrailor";

const VideoBackground = ({movieId}) => {
 
   const trailorVideo =useSelector(store => store.movies?.trailorVideo)

   useMovieTrailor(movieId);
   
    return(
        <div className="w-screen ">   
          <iframe
            className="w-screen aspect-video "
            src={"https://www.youtube.com/embed/" + trailorVideo?.key + "?autoplay=1&mute=1"} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            ></iframe>
        </div>    
    )
}

export default VideoBackground;