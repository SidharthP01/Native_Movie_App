import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login, isLoading, isLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to home
  if (isLoggedIn) {
    router.replace("/");
    return null;
  }

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/"); // Redirect to home on success
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          marginBottom: 12,
          padding: 10,
          borderRadius: 6,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          marginBottom: 12,
          padding: 10,
          borderRadius: 6,
        }}
      />

      {error && <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <TouchableOpacity
        onPress={() => router.push("/signup")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "blue", textAlign: "center" }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
