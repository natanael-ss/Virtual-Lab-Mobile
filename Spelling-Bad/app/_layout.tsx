import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Splash" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Sign Up" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="activity1" options={{ title: "Activity 1" }} />
      <Stack.Screen name="activity2" options={{ title: "Activity 2" }} />
      <Stack.Screen name="activity3" options={{ title: "Activity 3" }} />
    </Stack>
  );
}
