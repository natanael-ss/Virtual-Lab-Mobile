import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Activity 1"
          onPress={() => router.push("/activity1")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Activity 2"
          onPress={() => router.push("/activity2")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Activity 3"
          onPress={() => router.push("/activity3")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});
