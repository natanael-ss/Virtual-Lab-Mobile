import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Activity3() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity 3</Text>
      <Text>This is the third activity!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
