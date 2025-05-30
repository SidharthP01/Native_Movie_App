import "./globals.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../contexts/AppwriteContext";
import AuthenticationProvider from "../contexts/AppwriteContext";
import { useContext } from "react";
import { useAuth } from "../contexts/AppwriteContext";
export default function Layout() {
  return (
    <AuthenticationProvider>
      <StatusBar hidden />
      <RootNavigation />
    </AuthenticationProvider>
  );
}

function RootNavigation() {
  const { user, loading } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(Auth)/Index" options={{ headerShown: false }} />
        <Stack.Screen name="(Auth)/Verify" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
