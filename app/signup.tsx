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
import { createAccount } from "../services/appwrite";

export default function Signup() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to home
  if (isLoggedIn) {
    router.replace("/");
    return null;
  }

  const handleSignup = async () => {
    setError(null);
    setLoading(true);
    try {
      await createAccount({ email, password, name });
      // Auto login after signup
      await login(email, password);
      router.replace("/"); // Redirect to home
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          marginBottom: 12,
          padding: 10,
          borderRadius: 6,
        }}
      />

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
        <Button title="Sign Up" onPress={handleSignup} />
      )}

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "blue", textAlign: "center" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
