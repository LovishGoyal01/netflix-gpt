import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { OPENAI_KEY } from "../utils/constants";
import { API_options } from "../utils/constants";
import { addGptMovieResults ,removeGptMovieResult } from "../utils/gptslice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config.lang);
  const searchtext = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch( "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1" , API_options );
    const json = await data.json();
    return json.results;
  };


  const handleGptSearchClick = async () => {

      
  dispatch(removeGptMovieResult());

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchtext.current.value +
      ". Only give me names of 5 movies, comma separated like: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya do not provide any other text";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
        "HTTP-Referer": "http://localhost:5173", 
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", 
        messages: [{ role: "user", content: gptQuery }],
      }),
    });

    const data = await response.json();

    if (!data.choices) {
      console.error("GPT Error: ", data);
      alert("Something went wrong. Check your API key or model.");
      return;
    }

    const gptMovies = data.choices[0]?.message?.content?.split(",").map((movie) => movie.trim());

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }));
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black/80 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchtext}
          type="text"
          className="p-4 m-4 col-span-9 bg-white"
          placeholder={lang[langkey].GptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
