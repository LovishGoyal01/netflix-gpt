import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import { poster } from "../utils/constants";

const GptSearch = () => {
     
    return(
      
         <div className="relative min-h-screen ">
          <img src={poster} alt="background-img" className="h-screen object-cover fixed md:h-auto md:object-contain"/>
         
         <div className="relative">
           <GptSearchBar/>
           <GptMovieSuggestion/>
          </div> 
      </div> 
       
    )

}

export default GptSearch;