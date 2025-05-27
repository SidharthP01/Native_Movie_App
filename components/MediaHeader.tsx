import React, { useState, useCallback } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

type MediaHeaderProps = {
  thumbnail: string;
  trailerKey?: string;
};

const MediaHeader = ({ thumbnail, trailerKey }: MediaHeaderProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const onChangeState = useCallback((state: string) => {
    if (state === "playing") {
      setHasStarted(true);
    }
  }, []);

  return (
    <>
      <View style={{ width: "100%", height: 200, position: "relative" }}>
        {!hasStarted && (
          <ImageBackground
            source={{ uri: thumbnail }}
            resizeMode="stretch"
            style={StyleSheet.absoluteFillObject}
          />
        )}

        {trailerKey && (
          <View style={StyleSheet.absoluteFillObject} className="items-stretch">
            <YoutubePlayer
              height={400}
              play={isPlaying}
              videoId={trailerKey}
              onChangeState={onChangeState}
              width={"100%"}
            />
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Watch Movie</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#221F3D",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    width: "90%",
    marginLeft: 20,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default MediaHeader;
