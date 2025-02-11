import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Search",
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: "Tasks, Projects and More",
            tintColor: "#dc4c3e",
          },
        }}
      />
    </Stack>
  );
};
export default Layout;
