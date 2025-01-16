import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
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

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoLink}>
          <Image source={require('../assets/images/icon.png')} style={styles.logoImage} />
          <Text style={styles.logoText}>Spelling Bad</Text>
        </TouchableOpacity>
        <View style={styles.nav}>
          <Text style={styles.navLink} onPress={() => router.push('/login')}>Login</Text>
          <Text style={styles.navLink} onPress={() => router.push('/register')}>Sign Up</Text>
          <Text style={styles.navLink} onPress={() => router.push('/')}>Log out</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Jesse, Kita Harus Belajar Bahasa Indonesia</Text>
        <Text style={styles.description}>
          Speller White sedang melakukan rencana besarnya untuk membuat seluruh rakyat Indonesia menggunakan bahasa
          indonesia yang baik dan benar. Speller White ingin menguji dirimu untuk menentukan apakah dirimu layak untuk
          membantu dalam rencananya. Selesaikan semua pengujian untuk mendapat pengakuan dari Speller White!
        </Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/images/act1icon.png')} style={styles.cardImage} />
            <Text>Pilih Kata</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/images/act2icon.png')} style={styles.cardImage} />
            <Text>Susun Kata</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/images/act3icon.png')} style={styles.cardImage} />
            <Text>Lengkapi Kalimat</Text>
          </TouchableOpacity>
        </View>
      </View>
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
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(34, 34, 34, 0.9)',
  },
  logoLink: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 40, height: 40 },
  logoText: { color: '#fff', marginLeft: 8, fontSize: 16 },
  nav: { flexDirection: 'row', gap: 16 },
  navLink: { color: '#fff' },
  content: { padding: 16 },
  title: { fontSize: 18, marginBottom: 16, textAlign: 'center' },
  description: { marginBottom: 16 },
  cardContainer: {
    flexDirection: 'column', // Mengatur list aktivitas ke bawah
    gap: 16, // Jarak antar kartu
  },
  card: {
    flexDirection: 'row', // Konten dalam kartu sejajar horizontal
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ddd',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 16, // Jarak antara gambar dan teks
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
