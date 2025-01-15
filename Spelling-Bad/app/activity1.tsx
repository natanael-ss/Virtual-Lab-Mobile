import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Activity1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity 1</Text>
      <Text>This is the first activity!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
