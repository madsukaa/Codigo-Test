import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Button, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "config/hook/hooks";
import { toggleFavorite } from "config/store/favorites";
import { getMovieDetails, Movie } from "config/store/movies";
import { RootStackParamList } from "navigation/AppNavigator";
type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;
const DetailsScreen: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {
    movieId
  } = route.params;
  const dispatch = useAppDispatch();
  const movieDetails = useAppSelector(state => state.dataSvc.movies.details[movieId]);
  const favorites = useAppSelector(state => state.dataSvc.favorites.movies);
  const isFavorite = favorites.some(movie => movie.id === movieId);
  useEffect(() => {
    if (!movieDetails?.data) {
      dispatch(getMovieDetails(movieId));
    }
  }, [dispatch, movieId]);
  const handleToggleFavorite = () => {
    if (movieDetails?.data) {
      dispatch(toggleFavorite(movieDetails.data));
    }
  };
  if (!movieDetails || movieDetails.status === "loading") {
    return <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>;
  }
  if (movieDetails.status === "failed") {
    return <View style={styles.center}>
        <Text style={styles.errorText}>{movieDetails.error}</Text>
        <Button title="Retry" onPress={() => dispatch(getMovieDetails(movieId))} />
      </View>;
  }
  const movie = movieDetails.data as Movie;
  return <ScrollView contentContainerStyle={styles.container}>
      {movie.poster_path ? <Image source={{
      uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }} style={styles.poster} /> : <View style={[styles.poster, styles.noImage]}>
          <Text>No Image</Text>
        </View>}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <AntDesign name={isFavorite ? "heart" : "hearto"} size={30} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      {}
    </ScrollView>;
};
export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center"
  },
  poster: {
    width: "100%",
    height: 500,
    borderRadius: 10
  },
  noImage: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center"
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 10
  },
  releaseDate: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
    alignSelf: "flex-start"
  },
  overview: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "justify"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    color: "red",
    marginBottom: 10
  }
});