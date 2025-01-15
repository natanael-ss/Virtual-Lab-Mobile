import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      try {
        // Simulate loading (e.g., fonts or data)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn(error);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) return null;

  const navigateToLogin = () => router.push('/login');
  const navigateToRegister = () => router.push('/register');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Button title="Login" onPress={navigateToLogin} />
      <Button title="Sign Up" onPress={navigateToRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
