import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState, useEffect } from "react";
import { OPENAI_KEY, API_options } from "../utils/constants";
import { addGptMovieResults, removeGptMovieResult } from "../utils/gptslice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config.lang);
  const searchtext = useRef(null);
  const [loading, setLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
        API_options
      );
      const json = await res.json();
      return json.results || [];
    } catch (err) {
      console.error("TMDB fetch failed:", err);
      return [];
    }
  };

  useEffect(() => {
    searchtext.current?.focus();
  }, []);

  const handleGptSearchClick = async () => {
    if (!searchtext.current.value.trim()) {
      alert("Please enter a movie query.");
      return;
    }

    setLoading(true);
    dispatch(removeGptMovieResult());

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchtext.current.value +
      ". Only give me names of 5 movies, comma separated like: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya. Do not provide any other text.";

    try {
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
        setLoading(false);
        return;
      }

      const gptMovies = data.choices?.[0]?.message?.content
        ?.split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      if (!gptMovies || gptMovies.length === 0) {
        alert("GPT did not return any valid movie names.");
        setLoading(false);
        return;
      }

      const tmdbResults = await Promise.all(gptMovies.map(searchMovieTMDB));

      dispatch(addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (error) {
      console.error("GPT fetch failed:", error);
      alert("Something went wrong. Please check your network or API key.");
    }

    setLoading(false);
  };

  const handleClearClick = () => {
    searchtext.current.value = "";
    dispatch(removeGptMovieResult());
  };

  return (
    <>
      <div className="pt-[40%] md:pt-[10%] flex justify-center">
        <form
          className="w-full md:w-1/2 bg-black/75 flex items-center justify-between p-4 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            type="button"
            className="px-5 py-3 bg-cyan-700 text-white rounded-l-lg hover:bg-cyan-800"
            onClick={handleClearClick}
          >
            Clear
          </button>

          <input
            ref={searchtext}
            type="text"
            className="flex-grow mx-2 p-3 bg-white rounded-md focus:outline-none"
            placeholder={lang[langkey].GptSearchPlaceholder}
          />

          <button
            className="px-5 py-3 bg-red-700 text-white rounded-r-lg hover:bg-red-800"
            onClick={handleGptSearchClick}
          >
            {lang[langkey].search}
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center pt-8">
          <p className="text-white text-2xl font-semibold animate-pulse">
            🔍 Fetching movie suggestions...
          </p>
        </div>
      )}
    </>
  );
};

export default GptSearchBar;
