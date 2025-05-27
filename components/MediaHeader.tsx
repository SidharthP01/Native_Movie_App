import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from "react-native-webview";

type MediaHeaderProps = {
  thumbnail: string;
  trailerKey?: string;
  ImdbURL?: string; // Should be an embeddable page URL (not raw video file)
};

const MediaHeader = ({ thumbnail, trailerKey, ImdbURL }: MediaHeaderProps) => {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(true);
  const [hasTrailerStarted, setHasTrailerStarted] = useState(false);
  const [isMoviePlaying, setIsMoviePlaying] = useState(false);

  const onChangeState = useCallback((state: string) => {
    if (state === "playing") {
      setHasTrailerStarted(true);
    } else if (state === "ended") {
      setIsPlayingTrailer(false);
    }
  }, []);

  // Stop trailer and open fullscreen movie player
  const onPressWatchMovie = () => {
    setIsPlayingTrailer(false);
    setIsMoviePlaying(true);
  };

  // Close movie player
  const onCloseMovie = () => {
    setIsMoviePlaying(false);
    setIsPlayingTrailer(true);
  };

  return (
    <View>
      <View style={{ width: "100%", height: 200, position: "relative" }}>
        {!hasTrailerStarted && (
          <ImageBackground
            source={{ uri: thumbnail }}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
        )}

        {/* YouTube Trailer */}
        {trailerKey && isPlayingTrailer && (
          <View style={StyleSheet.absoluteFillObject}>
            <YoutubePlayer
              height={200}
              play={isPlayingTrailer}
              videoId={trailerKey}
              onChangeState={onChangeState}
              width={"100%"}
            />
          </View>
        )}
      </View>

      {/* Watch Movie Button */}
      <TouchableOpacity style={styles.button} onPress={onPressWatchMovie}>
        <Text style={styles.buttonText}>Watch Movie</Text>
      </TouchableOpacity>

      {/* Fullscreen Movie Player using WebView */}
      <Modal
        visible={isMoviePlaying}
        animationType="slide"
        supportedOrientations={["landscape", "portrait"]}
      >
        <View style={styles.fullscreenPlayer}>
          {ImdbURL ? (
            <WebView
              source={{ uri: ImdbURL }}
              style={styles.webview}
              allowsFullscreenVideo
              mediaPlaybackRequiresUserAction={false}
            />
          ) : (
            <Text style={{ color: "white" }}>No movie available</Text>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onCloseMovie}>
            <Text style={styles.closeButtonText}>Close Movie</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
    marginLeft: "5%",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  fullscreenPlayer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "#221F3D",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default MediaHeader;
