import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import { poster } from "../utils/constants";

const GptSearch = () => {
     
    return(
      
         <div className="relative min-h-screen ">
          <img src={poster} alt="background-img" className="absolute"/>
         
         <div className="relative">
           <GptSearchBar/>
           <GptMovieSuggestion/>
          </div> 
      </div> 
       
    )

}

export default GptSearch;