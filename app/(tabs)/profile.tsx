import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { logout } from "@/services/appwrite";
import { useAuth } from "@/contexts/AppwriteContext";
import { images } from "@/constants/images";

const Profile = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Call Appwrite logout
      setUser(null); // Clear user from context
      router.replace("../(Auth)/Index"); // Redirect to login screen
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="flex-1 bg-primary relative justify-center items-center">
      {/* Background Image */}
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Transparent Container */}
      <View className="bg-black/30 p-6 rounded-xl items-center justify-center gap-4 z-10">
        <Text className="text-white text-2xl font-bold">Profile</Text>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
