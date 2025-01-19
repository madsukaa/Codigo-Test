import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "config/hook/hooks";
import { toggleFavorite } from "config/store/favorites";
import { Movie } from "config/store/movies";
interface MovieItemProps {
  movie: Movie;
  onPress: () => void;
}
const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  onPress
}) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state => state.dataSvc.favorites.movies.some(fav => fav.id === movie.id));
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };
  return <TouchableOpacity style={styles.container} onPress={onPress}>
      {movie.poster_path ? <Image source={{
      uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    }} style={styles.image} /> : <View style={[styles.image, styles.noImage]}>
          <Text>No Image</Text>
        </View>}
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>{movie.release_date}</Text>
      </View>
      <TouchableOpacity onPress={handleToggleFavorite}>
        <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>;
};
export default MovieItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 5
  },
  noImage: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    flex: 1,
    marginLeft: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  releaseDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4
  }
});