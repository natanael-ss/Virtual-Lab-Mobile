import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Activity1() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const router = useRouter();

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
      Alert.alert('Benar!', 'Jawaban kamu tepat!', [
        {
          text: 'Lanjut',
          onPress: () => {
            if (currentQuestion + 1 < questions.length) {
              setCurrentQuestion(prev => prev + 1);
              setHintVisible(false);
            } else {
              Alert.alert('Selesai!', 'Kamu telah menyelesaikan semua pertanyaan!');
            }
          },
        },
      ]);
    } else {
      Alert.alert('Salah!', 'Jawaban tidak tepat, coba lagi!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.logoLink}
          onPress={() => router.push('/')}
        >
          <Image source={require('../assets/images/icon.png')} style={styles.logoImage} />
          <Text style={styles.logoText}>Spelling Bad</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentQuestion / questions.length) * 100}%` }]} />
        </View>
        
        <Text style={styles.questionCounter}>
          Pertanyaan {currentQuestion + 1} dari {questions.length}
        </Text>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
          
          <View style={styles.answersContainer}>
            {questions[currentQuestion].answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.answerButton}
                onPress={() => handleAnswer(index)}
              >
                <Text style={styles.answerText}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.hintButton}
            onPress={() => setHintVisible(!hintVisible)}
          >
            <Text style={styles.hintButtonText}>
              {hintVisible ? 'Sembunyikan Hint' : 'Tampilkan Hint'}
            </Text>
          </TouchableOpacity>
          
          {hintVisible && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>{questions[currentQuestion].hint}</Text>
            </View>
          )}
        </View>
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
  nav: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0b0423',
  },
  navButtonHighlight: {
    backgroundColor: '#0b0423',
  },
  navButtonText: {
    color: '#0b0423',
    fontWeight: '600',
  },
  navButtonTextHighlight: {
    color: '#ffffff',
  },
  content: {
    padding: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0b0423',
    borderRadius: 4,
  },
  questionCounter: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0b0423',
    marginBottom: 24,
    lineHeight: 28,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  answerText: {
    fontSize: 16,
    color: '#0b0423',
    lineHeight: 24,
  },
  hintButton: {
    marginTop: 24,
    padding: 12,
    alignItems: 'center',
  },
  hintButtonText: {
    color: '#0b0423',
    fontSize: 14,
    fontWeight: '600',
  },
  hintContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});