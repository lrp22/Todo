import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import "@/global.css";

const LoginScreen = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });

  const handleAppleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const openLink = async () => {
    WebBrowser.openBrowserAsync("https://google.com");
  };

  return (
    <View className="gap-10 mt-5">
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        className="h-10 self-center"
        style={{ resizeMode: "contain" }}
      />
      <Image
        source={require("@/assets/images/login.png")}
        className="h-70 w-full"
        style={{ resizeMode: "contain" }}
      />
      <Text className="text-center text-2xl font-bold mx-12">
        Organize your work and life, finally.
      </Text>

      <View className="gap-5 mx-10">
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 p-3 rounded-md border-2 border-lightBorder"
          onPress={handleAppleLogin}
        >
          <Ionicons name="logo-apple" size={24} />
          <Text className="text-lg font-medium">Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 p-3 rounded-md border-2 border-lightBorder"
          onPress={handleGoogleLogin}
        >
          <Ionicons name="logo-google" size={24} />
          <Text className="text-lg font-medium">Continue with Google</Text>
        </TouchableOpacity>

        <Text className="text-xs text-center text-lightText">
          By continuing you agree to Todoist's{" "}
          <Text className="underline text-lightText" onPress={openLink}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text className="underline text-lightText" onPress={openLink}>
            Privacy Policy
          </Text>
          {"."}
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
