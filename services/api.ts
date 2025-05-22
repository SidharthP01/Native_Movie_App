import { ThemeProvider } from "@react-navigation/native";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&api_key=${TMDB_CONFIG.API_KEY}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc`;
  //console.log(endpoint);

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch Movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMoviesDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) throw new Error("Failed to fetch Movie Details");

    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
