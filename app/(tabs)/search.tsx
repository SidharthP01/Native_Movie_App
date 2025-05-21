import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";

const Search = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SearchBar
        onPress={() => {
          router.push("/search");
        }}
        placeholder="Search for Movies.."
      />

      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Searching for Movie
      </Text>
    </View>
  );
};

export default Search;
