import React, { JSX, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth } from "@/contexts/AppwriteContext";
import { getCurrentUser, verifyOTP } from "../../services/appwrite";
import { useRouter } from "expo-router";

export default function Verify(): JSX.Element {
  const router = useRouter();
  const [otp, setOTP] = useState<string>("");
  const { userId, setUser } = useAuth();

  const validOTP = otp.length === 6;

  const otpHandling = async (otp: string): Promise<void> => {
    try {
      console.log("Verifying OTP");
      const session = await verifyOTP(userId, otp);
      const user = await getCurrentUser(); // now safe to call
      setUser(user);
      router.push("/Home");
      console.log("Verified Successfully");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary px-5 justify-center items-center gap-10">
        <Entypo name="mail" size={80} color="white" />
        <View className="items-center gap-2">
          <Text className="text-4xl text-white font-bold">Verify OTP</Text>
          <Text className="text-white">
            We will send an OTP. Don't share this OTP with anyone
          </Text>
        </View>
        <View className="w-full gap-5">
          <View className="flex flex-row items-center bg-dark-200 rounded-lg px-5 py-4">
            <TextInput
              placeholder="Enter your 6 digit OTP"
              inputMode="numeric"
              className="flex-1 ml-2 text-white"
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              onChangeText={setOTP}
              value={otp}
              maxLength={6}
            />
          </View>

          <TouchableOpacity
            disabled={!validOTP}
            className={`w-full flex justify-center items-center rounded-[4px] h-[50] ${
              validOTP ? "bg-[#D6C7FF]" : "bg-gray-400"
            }`}
            onPress={() => otpHandling(otp)}
          >
            <Text className="ml-2 text-white font-bold text-2xl">
              Verify OTP
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
