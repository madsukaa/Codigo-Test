import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import NetInfo from "@react-native-community/netinfo";
import { fetchUpcomingMovies, fetchPopularMovies, fetchMovieDetails } from "config/api/tmdbApi";
import { RootState } from "./store";
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  isFavorite?: boolean;
}
interface MoviesState {
  upcoming: {
    data: Movie[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  popular: {
    data: Movie[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  details: {
    [key: number]: {
      data: Movie | null;
      status: "idle" | "loading" | "succeeded" | "failed";
      error: string | null;
    };
  };
}
const initialState: MoviesState = {
  upcoming: {
    data: [],
    status: "idle",
    error: null
  },
  popular: {
    data: [],
    status: "idle",
    error: null
  },
  details: {}
};
export const getUpcomingMovies = createAsyncThunk<Movie[], void, {
  state: RootState;
}>("movies/getUpcomingMovies", async (_, {
  rejectWithValue
}) => {
  try {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      throw new Error("No internet connection");
    }
    const movies = await fetchUpcomingMovies();
    return movies;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
export const getPopularMovies = createAsyncThunk<Movie[], void, {
  state: RootState;
}>("movies/getPopularMovies", async (_, {
  rejectWithValue
}) => {
  try {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      throw new Error("No internet connection");
    }
    const movies = await fetchPopularMovies();
    return movies;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
export const getMovieDetails = createAsyncThunk<Movie, number, {
  state: RootState;
}>("movies/getMovieDetails", async (movieId, {
  rejectWithValue
}) => {
  try {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      throw new Error("No internet connection");
    }
    const movie = await fetchMovieDetails(movieId);
    return movie;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
const Movies = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUpcomingMovies.pending, state => {
      state.upcoming.status = "loading";
      state.upcoming.error = null;
    }).addCase(getUpcomingMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.upcoming.status = "succeeded";
      state.upcoming.data = action.payload;
    }).addCase(getUpcomingMovies.rejected, (state, action) => {
      state.upcoming.status = "failed";
      state.upcoming.error = action.payload as string;
    });
    builder.addCase(getPopularMovies.pending, state => {
      state.popular.status = "loading";
      state.popular.error = null;
    }).addCase(getPopularMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.popular.status = "succeeded";
      state.popular.data = action.payload;
    }).addCase(getPopularMovies.rejected, (state, action) => {
      state.popular.status = "failed";
      state.popular.error = action.payload as string;
    });
    builder.addCase(getMovieDetails.pending, (state, action) => {
      const movieId = action.meta.arg;
      state.details[movieId] = {
        data: null,
        status: "loading",
        error: null
      };
    }).addCase(getMovieDetails.fulfilled, (state, action: PayloadAction<Movie>) => {
      const movieId = action.payload.id;
      state.details[movieId] = {
        data: action.payload,
        status: "succeeded",
        error: null
      };
    }).addCase(getMovieDetails.rejected, (state, action) => {
      const movieId = action.meta.arg;
      state.details[movieId] = {
        data: null,
        status: "failed",
        error: action.payload as string
      };
    });
  }
});
export default Movies.reducer;