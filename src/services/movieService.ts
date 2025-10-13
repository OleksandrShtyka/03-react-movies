import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesHTTPResponse {
 results: Movie[],
}

const fetchMovies = async (search: string): Promise<MoviesHTTPResponse> => {
  // Ensure the TMDB token is present at runtime to avoid confusing 401s
  const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
  if (!token) {
    throw new Error(
      "VITE_TMDB_TOKEN is not set. Add it to your .env file (VITE_TMDB_TOKEN=...) and restart the dev server."
    );
  }

  // Use the full search movie endpoint directly
  const url = "https://api.themoviedb.org/3/search/movie";

  try {
    const response = await axios.get<MoviesHTTPResponse>(url, {
      params: {
        query: search,
        include_adult: false,
        page: 1,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    // Normalize the error so callers can display a friendly message
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        `Failed to fetch movies: ${err.response.status} ${err.response.statusText}`
      );
    }
    throw err;
  }
};
export default fetchMovies;
