// saved.tsx

import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useBookmarks } from "@/contexts/BookmarkContexts";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Saved = () => {
  const { bookmarks } = useBookmarks();

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="mt-10">
          <Text className="text-lg text-white font-bold mb-3 ml-1">
            Saved Movies
          </Text>

          <View className="flex-row flex-wrap justify-start gap-x-5">
            {bookmarks.length === 0 ? (
              <Text className="text-light-300 mt-5">No movies saved yet.</Text>
            ) : (
              bookmarks.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Saved;
