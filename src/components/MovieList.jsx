import MovieCard from "./MovieCard";

const MovieList = ({title,movies=[]}) => {

      if (!movies || movies.length === 0) return null;

    return(
          <div className="px-1 ">
           <h1 className="text-lg md:text-3xl font-bold py-4 text-white">{title}</h1>
            <div className="flex overflow-x-auto no-scrollbar">
              <div className="flex whitespace-nowrap">
                 {movies?.map(movie => (
                 <MovieCard key={movie.id} posterPath={movie.poster_path} />
                ))}
              </div>
            </div>
         </div>
        )
}

export default MovieList;