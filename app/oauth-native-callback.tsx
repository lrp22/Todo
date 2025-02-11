import { View, ActivityIndicator } from "react-native";
import React from "react";

const Page = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#dc4c3e" />
    </View>
  );
};

export default Page;
