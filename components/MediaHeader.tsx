import React from "react";
import { ImageBackground, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

type MediaHeaderProps = {
  thumbnail: string;
  trailerKey?: string;
};

const MediaHeader = ({ thumbnail, trailerKey }: MediaHeaderProps) => {
  console.log(trailerKey);
  return (
    <View className="w-full h-[400px]">
      <ImageBackground
        source={{ uri: thumbnail }}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {trailerKey && (
          <YoutubePlayer height={220} play={false} videoId={trailerKey} />
        )}
      </ImageBackground>
    </View>
  );
};

export default MediaHeader;
