import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

type SuggestionCardProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
};

const SuggestionCard = ({ movie }: SuggestionCardProps) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text
          className="text-sm font-bold mt-2 text-light-200 ml-1"
          numberOfLines={2}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default SuggestionCard;
