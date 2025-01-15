import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Activity2() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity 2</Text>
      <Text>This is the second activity!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
