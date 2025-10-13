import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesHTTPResponse {
 results: Movie[],
}

const fetchMovies = async (search: string): Promise<MoviesHTTPResponse> => {
  const BASE_URL = "https://api.themoviedb.org/3/search";
  const ENDPOINT = `/movie`;
  const url = BASE_URL + ENDPOINT;


  const response = await axios.get<MoviesHTTPResponse>(url, {
    params: {
      query: search,
      include_adult: false,
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return response.data;
};
export default fetchMovies;
