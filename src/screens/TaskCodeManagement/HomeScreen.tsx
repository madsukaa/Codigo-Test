import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MovieItem from "components/MovieItem";
import { useAppDispatch, useAppSelector } from "config/hook/hooks";
import { getUpcomingMovies, getPopularMovies, Movie } from "config/store/movies";
import { RootStackParamList } from "navigation/AppNavigator";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const upcoming = useAppSelector(state => state.dataSvc.movies.upcoming);
  const popular = useAppSelector(state => state.dataSvc.movies.popular);
  const favorites = useAppSelector(state => state.dataSvc.favorites.movies);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getUpcomingMovies());
    dispatch(getPopularMovies());
  }, [dispatch]);
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([dispatch(getUpcomingMovies()), dispatch(getPopularMovies())]);
    setRefreshing(false);
  };
  const renderMovieItem = (movie: Movie) => <MovieItem movie={movie} onPress={() => navigation.navigate("Details", {
    movieId: movie.id
  })} />;
  return <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {}
      <Text style={styles.sectionTitle}>Upcoming Movies</Text>
      {upcoming.status === "loading" ? <ActivityIndicator size="large" color="#0000ff" /> : upcoming.status === "failed" ? <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{upcoming.error}</Text>
          <Button title="Retry" onPress={() => dispatch(getUpcomingMovies())} />
        </View> : <FlatList data={upcoming.data} keyExtractor={item => item.id.toString()} renderItem={({
      item
    }) => renderMovieItem(item)} horizontal showsHorizontalScrollIndicator={false} />}

      {}
      <Text style={styles.sectionTitle}>Popular Movies</Text>
      {popular.status === "loading" ? <ActivityIndicator size="large" color="#0000ff" /> : popular.status === "failed" ? <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{popular.error}</Text>
          <Button title="Retry" onPress={() => dispatch(getPopularMovies())} />
        </View> : <FlatList data={popular.data} keyExtractor={item => item.id.toString()} renderItem={({
      item
    }) => renderMovieItem(item)} horizontal showsHorizontalScrollIndicator={false} />}

      {}
      <Text style={styles.sectionTitle}>Favorites</Text>
      {favorites.length === 0 ? <Text style={styles.noFavoritesText}>No favorite movies yet.</Text> : <FlatList data={favorites} keyExtractor={item => item.id.toString()} renderItem={({
      item
    }) => renderMovieItem(item)} horizontal showsHorizontalScrollIndicator={false} />}
    </ScrollView>;
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10
  },
  errorContainer: {
    alignItems: "center",
    marginVertical: 10
  },
  errorText: {
    color: "red",
    marginBottom: 5
  },
  noFavoritesText: {
    color: "#666",
    fontStyle: "italic"
  }
});