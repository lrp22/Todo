import { Stack } from "expo-router";
import MoreButton from "@/components/MoreButton";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Upcoming",
          headerRight: () => <MoreButton pageName="Upcoming"/>,
        }}
      />
    </Stack>
  );
};
export default Layout;
