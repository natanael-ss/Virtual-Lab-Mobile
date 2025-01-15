import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../src/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const response = await registerUser(name, email, password, confPassword);

    if (response.error) {
      Alert.alert('Registration Failed', response.error);
    } else {
      Alert.alert('Registration Successful', `Welcome ${response.name}`);
      router.replace('/login'); // Redirect to login page after registration
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confPassword}
        onChangeText={setConfPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => router.replace('/login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
});

export default Register;
