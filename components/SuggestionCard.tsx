import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

type SuggestionCardProps = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

const SuggestionCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: SuggestionCardProps) => {
  return (
    <TouchableOpacity className="w-[30%] mb-5">
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
        }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default SuggestionCard;
