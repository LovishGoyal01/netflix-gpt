import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion= () => {
     
    const {movieNames,movieResults} = useSelector(store => store.gpt);

    if(!movieNames || !movieResults) return null; 
    

    return(
        <div className="p-4 m-4 bg-black/70 text-white"> 
           <div>
          {movieNames.map((moviename,index) => (
            <MovieList 
            key={moviename} 
            title={moviename} 
            movies={movieResults[index]} />))}  
           </div>
        </div>
    )

}

export default GptMovieSuggestion;