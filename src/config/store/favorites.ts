import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "./movies";
interface FavoritesState {
  movies: Movie[];
}
const initialState: FavoritesState = {
  movies: []
};
const Favorites = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const existingIndex = state.movies.findIndex(movie => movie.id === action.payload.id);
      if (existingIndex >= 0) {
        state.movies.splice(existingIndex, 1);
      } else {
        state.movies.push(action.payload);
      }
    }
  }
});
export const {
  toggleFavorite
} = Favorites.actions;
export default Favorites.reducer;