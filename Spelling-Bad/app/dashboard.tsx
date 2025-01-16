import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoLink}>
          <Image source={require("../assets/images/icon.png")} style={styles.logoImage} />
          <Text style={styles.logoText}>Spelling Bad</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => router.push("/")}
        >
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Jesse, Kita Harus Belajar Bahasa Indonesia</Text>
          <Text style={styles.description}>
            Speller White sedang melakukan rencana besarnya untuk membuat seluruh rakyat Indonesia menggunakan bahasa
            indonesia yang baik dan benar. Speller White ingin menguji dirimu untuk menentukan apakah dirimu layak untuk
            membantu dalam rencananya. Selesaikan semua pengujian untuk mendapat pengakuan dari Speller White!
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push("/activity1")}
          >
            <Image source={require("../assets/images/act1icon.png")} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Pilih Kata</Text>
              <Text style={styles.cardDescription}>Test your vocabulary skills</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push("/activity2")}
          >
            <Image source={require("../assets/images/act2icon.png")} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Susun Kata</Text>
              <Text style={styles.cardDescription}>Arrange words in proper order</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push("/activity3")}
          >
            <Image source={require("../assets/images/act3icon.png")} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Lengkapi Kalimat</Text>
              <Text style={styles.cardDescription}>Complete the sentences</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => console.log("Reset aktivitas")}
        >
          <Text style={styles.resetButtonText}>Reset Aktivitas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  logoText: {
    color: '#0b0423',
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ff4444',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  heroSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0b0423',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 8,
  },
  cardContainer: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b0423',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  resetButton: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});