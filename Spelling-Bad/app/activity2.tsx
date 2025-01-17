import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 0.5,
};

const App = () => {
  const [rectangles, setRectangles] = useState<string[]>(['rectangle1', 'rectangle2', 'rectangle3', 'rectangle4', 'rectangle5']);
  const [answerSequence, setAnswerSequence] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const positions = rectangles.reduce((acc, rect) => {
    acc[rect] = {
      x: useSharedValue(0),
      y: useSharedValue(0),
      scale: useSharedValue(1),
      isDragging: useSharedValue(false),
    };
    return acc;
  }, {} as Record<string, { 
    x: Animated.SharedValue<number>; 
    y: Animated.SharedValue<number>; 
    scale: Animated.SharedValue<number>;
    isDragging: Animated.SharedValue<boolean>; 
  }>);

  const page = [
    {
      name: 'tutorial',
      judul: 'Tutorial',
      recText: ['B', 'A', 'E', 'C', 'D'],
      answer: ['rectangle2', 'rectangle1', 'rectangle4', 'rectangle5', 'rectangle3'],
      soal: 'Silahkan pindahkan kotak sehingga terurut sesuai abjad. Klik tombol konfirmasi jika sudah yakin dengan jawabanmu.',
    },
    {
      name: 'soal1',
      judul: 'Soal 1 dari 5',
      recText: ['bagi manusia.', 'membawa', 'tidak selalu', 'Kemajuan teknologi', 'dampak positif'],
      answer: ['rectangle4', 'rectangle3', 'rectangle2', 'rectangle5', 'rectangle1'],
      soal: 'Susunlah menjadi suatu kalimat dengan pola S-K-P-O-K!',
    },
    {
      name: 'soal2',
      judul: 'Soal 2 dari 5',
      recText: ['melalui uji klinis tahap ketiga', 'vaksin COVID-19', 'Para peneliti', 'di laboratorium Pfizer.', 'menemukan'],
      answer: ['rectangle3', 'rectangle5', 'rectangle2', 'rectangle1', 'rectangle4'],
      soal: 'Susunlah menjadi sebuah kalimat dengan pola S-P-O-K-K!',
    },
    {
      name: 'soal3',
      judul: 'Soal 3 dari 5',
      recText: ['masih banyak daerah terpencil', 'Meskipun pemerintah telah berupaya', 'meningkatkan mutu pendidikan,', 'fasilitas memadai.', 'yang belum mendapatkan'],
      answer: ['rectangle2', 'rectangle3', 'rectangle1', 'rectangle5', 'rectangle4'],
      soal: 'Susunlah menjadi sebuah kalimat utuh!',
    },
    {
      name: 'soal4',
      judul: 'Soal 4 dari 5',
      recText: ['ke kolam berenang', 'Budiono Siregar', 'menjadi kapal laut.', 'untuk berlatih', 'pergi'],
      answer: ['rectangle2', 'rectangle5', 'rectangle1', 'rectangle4', 'rectangle3'],
      soal: 'Susunlah menjadi sebuah kalimat utuh!',
    },
    {
      name: 'soal5',
      judul: 'Soal 5 dari 5',
      recText: ['sulit melintas.', 'sehingga kendaraan', 'menjadi licin,', 'jalan di desa', 'Karena hujan turun deras,'],
      answer: ['rectangle5', 'rectangle4', 'rectangle3', 'rectangle2', 'rectangle1'],
      soal: 'Susunlah menjadi sebuah kalimat utuh!',
    },
  ];

  const updateAnswerSequence = (item: string, targetY: number) => {
    const dropZoneY = 200; // Adjusted drop zone threshold
    if (targetY < dropZoneY) {
      setAnswerSequence((prev) => {
        if (!prev.includes(item)) {
          return [...prev, item];
        }
        return prev;
      });
    }
  };

  const createPanGestureHandler = (rect: string) => {
    return useAnimatedGestureHandler({
      onStart: (_, context: any) => {
        context.startX = positions[rect].x.value;
        context.startY = positions[rect].y.value;
        positions[rect].isDragging.value = true;
        positions[rect].scale.value = withSpring(1.1, SPRING_CONFIG);
      },
      onActive: (event, context) => {
        positions[rect].x.value = context.startX + event.translationX;
        positions[rect].y.value = context.startY + event.translationY;
      },
      onEnd: (event, context) => {
        const targetY = context.startY + event.translationY;
        positions[rect].isDragging.value = false;
        positions[rect].scale.value = withSpring(1, SPRING_CONFIG);

        if (targetY < 200) {
          runOnJS(updateAnswerSequence)(rect, targetY);
        }

        positions[rect].x.value = withSpring(0, SPRING_CONFIG);
        positions[rect].y.value = withSpring(0, SPRING_CONFIG);
      },
    });
  };

  const getAnimatedStyle = (rect: string) => {
    return useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: positions[rect].x.value },
          { translateY: positions[rect].y.value },
          { scale: positions[rect].scale.value },
        ],
        zIndex: positions[rect].isDragging.value ? 999 : 1,
        shadowOpacity: withSpring(positions[rect].isDragging.value ? 0.3 : 0),
        shadowRadius: withSpring(positions[rect].isDragging.value ? 10 : 0),
      };
    });
  };

  const handleConfirmation = () => {
    const correctAnswer = page[currentPage].answer;

    if (answerSequence.length === 0) {
      Alert.alert('Warning', 'Please arrange the words first!');
      return;
    }

    if (JSON.stringify(answerSequence) === JSON.stringify(correctAnswer)) {
      if (currentPage < page.length - 1) {
        Alert.alert('Correct! 🎉', 'Moving to the next question...');
        setAnswerSequence([]);
        setCurrentPage(prev => prev + 1);
      } else {
        Alert.alert('Congratulations! 🎉', 'You have completed all questions!');
        setIsCompleted(true);
      }
    } else {
      Alert.alert('Try Again', 'The sequence is not correct. Keep trying!');
    }
  };

  const currentQuestion = page[currentPage];

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={!rectangles.some(rect => positions[rect].isDragging.value)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{currentQuestion.judul}</Text>
        <Text style={styles.progress}>{`${currentPage + 1}/${page.length}`}</Text>
      </View>

      <Text style={styles.question}>{currentQuestion.soal}</Text>

      <View style={styles.dropZone}>
        <Text style={styles.dropZoneLabel}>Drop Zone</Text>
        {answerSequence.map((item, index) => (
          <View key={index} style={styles.dropItem}>
            <Text style={styles.dropItemText}>
              {currentQuestion.recText[parseInt(item.replace('rectangle', '')) - 1]}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.rectangleContainer}>
        {rectangles.map((rect, index) => (
          <PanGestureHandler 
            key={rect} 
            onGestureEvent={createPanGestureHandler(rect)}
          >
            <Animated.View style={[styles.rectangle, getAnimatedStyle(rect)]}>
              <Text style={styles.rectangleText}>
                {currentQuestion.recText[index]}
              </Text>
            </Animated.View>
          </PanGestureHandler>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => setAnswerSequence([])} 
          style={[styles.button, styles.resetButton]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleConfirmation} 
          style={[styles.button, styles.confirmButton]}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0b0423',
  },
  progress: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  question: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropZone: {
    minHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#0b0423',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropZoneLabel: {
    position: 'absolute',
    top: -10,
    left: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    color: '#0b0423',
    fontSize: 14,
    fontWeight: '600',
  },
  dropItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropItemText: {
    fontSize: 16,
    color: '#333',
  },
  rectangleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  rectangle: {
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: (SCREEN_WIDTH - 80) / 2,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  rectangleText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmButton: {
    backgroundColor: '#0b0423',
  },
  resetButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;