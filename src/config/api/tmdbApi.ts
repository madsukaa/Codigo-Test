import axios from "axios";
import { Movie } from "config/store/movies";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.MOVIE_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});
export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get("/movie/upcoming");
  return response.data.results;
};
export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get("/movie/popular");
  return response.data.results;
};
export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};
