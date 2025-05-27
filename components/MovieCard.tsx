import { icons } from "@/constants/icons";
import { useBookmarks } from "@/contexts/BookmarkContexts";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type MovieCardProps = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: MovieCardProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(id);

  return (
    <Link href={`/movies/${id}`} asChild>
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
        <TouchableOpacity
          onPress={() =>
            toggleBookmark({
              id,
              poster_path,
              title,
              vote_average,
              release_date,
            })
          }
          className="absolute top-2 right-2 z-10"
        >
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={bookmarked ? "yellow" : "white"}
          />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="w-4 h-4 tint-yellow-400" />
          <Text className="text-xs text-white font-bold uppercase">
            {vote_average.toFixed(1)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase mt-1">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
