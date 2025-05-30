import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import SuggestionCard from "@/components/SuggestionCard";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies, fetchMoviesByGenre } from "@/services/api";
import { getTopGenres, getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  //console.log(trendingMovies);
  const {
    data: Movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: topGenres,
    loading: genresLoading,
    error: genresError,
  } = useFetch(getTopGenres); // get top genres based on user's interactions

  const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [suggestionsError, setSuggestionsError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!topGenres || topGenres.length === 0) return;

      setSuggestionsLoading(true);
      setSuggestionsError(null);

      try {
        const movies = await fetchMoviesByGenre(topGenres.slice(0, 2));
        setSuggestedMovies(movies);
      } catch (error) {
        setSuggestionsError(error as Error);
      } finally {
        setSuggestionsLoading(false);
      }
    };

    fetchSuggestions();
  }, [topGenres]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex 1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <SearchBar
          onPress={() => {
            router.push("/search");
          }}
          placeholder="Search for Movies.."
        />

        {moviesLoading ||
        trendingLoading ||
        suggestionsLoading ||
        genresLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError || suggestionsError || genresError ? (
          <Text className="text-white">
            Error:{" "}
            {moviesError?.message ||
              trendingError?.message ||
              suggestionsError?.message ||
              genresError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <>
              {suggestedMovies && suggestedMovies.length > 0 && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">
                    Suggestions for You
                  </Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    className="mb-4 mt-3"
                    data={suggestedMovies}
                    renderItem={({ item }) => <SuggestionCard movie={item} />}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
              )}

              <Text className="text-lg text-white font-bold mb-3 mt-6">
                Trending Movies
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3"
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />

              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={Movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
