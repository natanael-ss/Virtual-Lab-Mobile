import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Splash", headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Login", headerShown: false }} />
        <Stack.Screen name="register" options={{ title: "Sign Up", headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ title: "Dashboard", headerShown: false }} />
        <Stack.Screen name="activity1" options={{ title: "Activity 1", headerShown: false }} />
        <Stack.Screen name="activity2" options={{ title: "Activity 2", headerShown: false }} />
        <Stack.Screen name="activity3" options={{ title: "Activity 3", headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
