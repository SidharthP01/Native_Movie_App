import React, { JSX, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";

import { sendOTP } from "../../services/appwrite"; // Your service function
import { useAuth } from "../../contexts/AppwriteContext";

// Define the expected shape of the sendOTP return value
interface SessionToken {
  $createdAt: string;
  $id: string;
  expire: string;
  phrase: string;
  secret: string;
  userId: string;
}

export default function SendOtp(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserId } = useAuth();

  const otpHandling = async (email: string) => {
    try {
      setLoading(true);
      // Tell TS what sendOTP returns
      const sessionToken: SessionToken = await sendOTP(email);

      setUserId(sessionToken.userId);
      console.log("Session Token:", sessionToken);

      router.push("/Verify");
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary px-5 justify-center items-center gap-10">
        <Entypo name="mail" size={80} color="white" />
        <View className="items-center gap-2">
          <Text className="text-4xl text-white font-bold">
            Login with Email
          </Text>
          <Text className="text-white">
            We will send an OTP. Do not share this OTP with anyone
          </Text>
        </View>
        <View className="w-full gap-5">
          <View className="flex flex-row items-center bg-dark-200 rounded-lg px-5 py-4">
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              className="flex-1 ml-2 text-white"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />
          </View>

          <TouchableOpacity
            className="w-full flex justify-center items-center bg-[#D6C7FF] rounded-[4px] h-[50]"
            onPress={() => otpHandling(email)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="ml-2 text-white font-bold text-2xl">
                Send OTP
              </Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text className="text-red-500 mt-4 text-center">
              {error.message || "Something went wrong"}
            </Text>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
