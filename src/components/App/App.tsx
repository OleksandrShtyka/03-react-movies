import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHTTPError, setHTTPError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleOnSubmit = async (search: string) => {
    setIsLoading(true);
    setHTTPError(false);
    setMovies([]);
    try {
      const data = await fetchMovies(search);
      const info = data.results;
      if (data.results.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(info);
    } catch (error) {
      setHTTPError(true);
      console.log(error);
    }

    setIsLoading(false);
  };

  const closeModal = () => setSelectedMovie(null);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <SearchBar onSubmit={handleOnSubmit}></SearchBar>
      <div>
        <Toaster />
      </div>

      {isLoading && <Loader />}
      {isHTTPError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && selectedMovie !== null && (
        <MovieModal onClose={closeModal} movie={selectedMovie}></MovieModal>
      )}
    </>
  );
}

export default App;
