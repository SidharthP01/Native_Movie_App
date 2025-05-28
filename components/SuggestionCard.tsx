import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

type SuggestionCardProps = {
  movie: {
    id: number;
    title: string;
    backdrop_path: string;
  };
};

const SuggestionCard = ({ movie }: SuggestionCardProps) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-64 h-36 rounded-lg overflow-hidden mr-4 relative">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          }}
          className="w-full h-full absolute"
          resizeMode="stretch"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-opacity-60 px-3 py-2">
          <Text className="text-white text-sm font-bold" numberOfLines={1}>
            {movie.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SuggestionCard;
