import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../src/api';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !username || !password || !confPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const response = await registerUser(name, username, password, confPassword);

    if (response.error) {
      Alert.alert('Registration Failed', response.error);
    } else {
      Alert.alert('Registration Successful', `Welcome ${response.name}`);
      router.replace('/login'); // Redirect to login page after registration
    }
  };

  return (
    <ScrollView style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.logoLink}>
        <Image source={require("../assets/images/icon.png")} style={styles.logoImage} />
        <Text style={styles.logoText}>Spelling Bad</Text>
      </TouchableOpacity>
    </View>

    {/* Form */}
    <View style={styles.form}>
      <Text style={styles.title}>SIGN UP</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Sudah memiliki akun?{" "}
        <Text style={styles.signUpLink} onPress={() => router.push("/login")}>
          Log in
        </Text>
      </Text>
    </View>

    {/* Footer */}
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2024 Spelling Bad. All rights reserved.</Text>
      <View style={styles.footerLinks}>
        <Text style={styles.footerLink}>About Us</Text>
        <Text style={styles.footerLink}>Facebook</Text>
        <Text style={styles.footerLink}>Twitter</Text>
        <Text style={styles.footerLink}>Instagram</Text>
      </View>
    </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fdfdfd",
},
header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
  backgroundColor: "rgba(34, 34, 34, 0.9)",
},
logoLink: {
  flexDirection: "row",
  alignItems: "center",
},
logoImage: {
  width: 40,
  height: 40,
},
logoText: {
  color: "#fff",
  marginLeft: 8,
  fontSize: 16,
},
form: {
  padding: 16,
  alignItems: "center",
},
title: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 16,
  textAlign: "center",
},
input: {
  width: "100%",
  padding: 12,
  borderWidth: 1,
  borderColor: "#000",
  borderRadius: 5,
  marginBottom: 15,
  fontSize: 16,
},
button: {
  width: "100%",
  backgroundColor: "#0b0423",
  padding: 15,
  borderRadius: 5,
  alignItems: "center",
},
buttonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
signUpText: {
  marginTop: 15,
  fontSize: 14,
  textAlign: "center",
},
signUpLink: {
  color: "#007BFF",
  fontWeight: "bold",
  textDecorationLine: "underline",
},
footer: {
  backgroundColor: "rgba(34, 34, 34, 0.9)",
  padding: 16,
  alignItems: "center",
},
footerText: {
  color: "#aaa",
},
footerLinks: {
  flexDirection: "row",
  marginTop: 8,
  gap: 16,
},
footerLink: {
  color: "#bbb",
},
});

export default Register;
