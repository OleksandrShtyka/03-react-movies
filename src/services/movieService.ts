import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<TMDBResponse> {
  const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data;
}
