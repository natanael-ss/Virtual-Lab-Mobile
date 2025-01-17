import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';

export default function Activity1() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);

  const questions = [
      {
        question: "Manakah pernyataan yang benar mengenai fungsi bahasa Indonesia sebagai bahasa resmi?",
        answers: [
            "Bahasa Indonesia hanya digunakan dalam lingkup pendidikan",
            "Bahasa Indonesia hanya dipakai dalam lingkungan rumah tangga",
            "Bahasa Indonesia digunakan sebagai bahasa administrasi negara dan pemerintahan",
            "Bahasa Indonesia hanya dipakai untuk komunikasi internasional",
        ],
        correct:2,
        hint:"Pikirkan tentang fungsi bahasa Indonesia yang diatur dalam undang-undang dan digunakan dalam komunikasi formal di seluruh wilayah Indonesia."
    },
    {
        question: "Apakah yang dimaksud dengan diksi dalam penulisan karya ilmiah?",
        answers: [
            "Gaya penulisan dalam menyampaikan ide dan gagasan",
            "Pemilihan kata yang tepat untuk mengungkapkan gagasan",
            "Pola pengembangan paragraf dalam teks",
            "Struktur kalimat yang sesuai dengan tata bahasa",
        ],
        correct:1,
        hint:"Diksi berkaitan dengan bagaimana kata dipilih secara hati-hati agar dapat mengekspresikan gagasan dengan tepat dan jelas dalam tulisan."
    },
    {
        question: "Struktur utama dalam teks eksposisi terdiri atas:",
        answers: [
            "Pernyataan umum, argumen, dan penutup",
            "Orientasi, komplikasi, dan resolusi",
            "Abstraksi, krisis, dan evaluasi",
            "Identifikasi, deskripsi, dan simpulan",
        ],
        correct:0,
        hint:"Teks eksposisi bertujuan untuk memberikan informasi dan argumentasi logis kepada pembaca, bukan untuk menyajikan cerita."
    },
    {
        question: "Apakah ciri utama bahasa ragam ilmiah?",
        answers: [
            "Menggunakan bahasa yang santai dan tidak formal",
            "Banyak menggunakan kata-kata emotif dan kiasan",
            "Menyajikan fakta secara objektif dan sistematis",
            "Menggunakan kalimat percakapan sehari-hari",
        ],
        correct:2,
        hint:"Bahasa ilmiah memiliki ciri khusus yang menekankan pada ketepatan dan objektivitas."
    },
    {
        question: "Manakah yang merupakan contoh kalimat efektif dalam penulisan ilmiah?",
        answers: [
            "Keadaan di lapangan pada saat ini sungguh sangat memprihatinkan.",
            "Studi ini meneliti dampak negatif urbanisasi terhadap lingkungan.",
            "Sesungguhnya permasalahan ini tidaklah terlalu besar dampaknya.",
            "Penelitian ini mungkin bisa jadi memberikan hasil yang tidak signifikan.",
        ],
        correct:1,
        hint:"Kalimat efektif dalam penulisan ilmiah bersifat ringkas, jelas, dan langsung pada inti informasi tanpa kata-kata berlebihan."
    },
    // Add more questions as needed
  ];

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correct) {
      Alert.alert('Correct!', 'You got the right answer!', [
        {
          text: 'OK',
          onPress: () => {
            setCurrentQuestion((prev) => (prev + 1 < questions.length ? prev + 1 : prev));
            setHintVisible(false);
          },
        },
      ]);
    } else {
      Alert.alert('Incorrect!', 'Jawaban salah, coba lagi!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.logoText}>Spelling Bad</Text>
        </View>
        <View style={styles.nav}>
          <TouchableOpacity>
            <Text style={styles.navLink}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navLink}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Logged out')}>
            <Text style={styles.navLink}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <Text style={styles.question}>{questions[currentQuestion].question}</Text>
        {questions[currentQuestion].answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answerButton}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Show Hint" onPress={() => setHintVisible(!hintVisible)} />
        {hintVisible && <Text style={styles.hint}>{questions[currentQuestion].hint}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
  },
  nav: {
    flexDirection: 'row',
    gap: 16,
  },
  navLink: {
    color: '#fff',
    fontSize: 16,
  },
  main: {
    flex: 1,
    padding: 16,
  },
  question: {
    fontSize: 18,
    marginBottom: 16,
  },
  answerButton: {
    backgroundColor: '#ddd',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  answerText: {
    fontSize: 16,
  },
  hint: {
    marginTop: 16,
    fontStyle: 'italic',
    color: '#666',
  },
});