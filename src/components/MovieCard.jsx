import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {

    if(!posterPath) return null;

    return(   
    <div className="overflow-hidden w-36 md:w-48 pr-4 ">
        <img 
            alt="Movie Card" 
            src={IMG_CDN_URL + posterPath} 
            className="w-full h-44 md:h-72 object-cover rounded-sm md:rounded-md transition-transform duration-300 hover:scale-105"
        />
    </div>
    )    
}

export default MovieCard; 