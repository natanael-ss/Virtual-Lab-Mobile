import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity,Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../src/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const response = await loginUser(email, password);

    if (response.error) {
      Alert.alert('Login Failed', response.error);
    } else {
      Alert.alert('Login Successful', `Welcome ${response.name}`);
      router.replace('/dashboard'); // Navigate to dashboard after login
    }
  };

 
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoLink}>
          <Image source={require('../assets/images/icon.png')} style={styles.logoImage} />
          <Text style={styles.logoText}>Spelling Bad</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.title}>LOG IN</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>
          Tidak memiliki akun?{' '}
          <Text style={styles.signUpLink} onPress={() => router.push('/register')}>
            Sign up
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
    backgroundColor: '#fdfdfd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(34, 34, 34, 0.9)',
  },
  logoLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  logoText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  nav: {
    flexDirection: 'row',
    gap: 16,
  },
  navLink: {
    color: '#fff',
  },
  form: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#0b0423',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  signUpLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  footer: {
    backgroundColor: 'rgba(34, 34, 34, 0.9)',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#aaa',
  },
  footerLinks: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  footerLink: {
    color: '#bbb',
  },
});

export default Login;