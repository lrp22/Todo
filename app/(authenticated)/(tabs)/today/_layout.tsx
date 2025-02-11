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
          title: "Today",
          headerLargeTitle: true,
          headerRight: () => <MoreButton pageName="Today" />,
        }}
      />
    </Stack>
  );
};
export default Layout;
