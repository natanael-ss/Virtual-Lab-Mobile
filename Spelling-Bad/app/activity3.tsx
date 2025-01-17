import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const SpellingActivity = () => {
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showHint, setShowHint] = useState(false);
    const router = useRouter();

    const pages = [
      {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Matahari sudah tinggi, namun Ani belum juga ',
        qright:' dari tidurnya.',
        hint : 'Kata lain dari bangkit; berdiri (dari duduk, tidur, dan sebagainya).',
        answer:'bangun'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Ibunya sudah ',
        qright:' kali memanggil, tetapi Ani tetap tidak bergeming. dari tidurnya.',
        hint : 'Definisi kata : dilakukan lebih dari satu kali',
        answer:'berulang'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Akhirnya, ibu ',
        qright:' Ani ke kamarnya dan membangunkannya secara langsung.',
        hint : 'Kata ini berimbuhan men-i',
        answer:'mendatangi'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : '"Ani, sudah ',
        qright:' ! Ayo cepat bangun!" kata ibu dengan nada tegas.',
        hint : 'Definisi kata : waktu setelah matahari terbit hingga menjelang siang hari.',
        answer:'pagi'
    },
    {
        question : "Lengkapi kalimat berikut!",
        qleft : 'Dengan Malas, Ani bangkit dari tempat tidurnya dan ',
        qright:' ke kamar mandi untuk mencuci muka.',
        hint : 'Definisi kata: melangkahkan kaki bergerak maju',
        answer:'berjalan'
    },
    ];

    const nextPage = () => {
        if (currentPage === pages.length - 1) {
            Alert.alert('Selamat! 🎉', 'Kamu telah menyelesaikan aktivitas ini!', [
                { text: 'Kembali ke Menu', onPress: () => router.push('/dashboard') }
            ]);
        } else {
            setIsCorrect(null);
            setInputValue('');
            setShowHint(false);
            setCurrentPage(currentPage + 1);
        }
    };

    const checkAnswer = () => {
        if (inputValue.toLowerCase().trim() === pages[currentPage].answer) {
            setIsCorrect(true);
            Alert.alert('Benar! 👏', 'Jawabanmu tepat!');
        } else {
            setIsCorrect(false);
            Alert.alert('Salah! 😅', 'Coba lagi ya!');
        }
    };

    const reset = () => {
        setInputValue('');
        setIsCorrect(null);
        setShowHint(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.logoLink}
                    onPress={() => router.push('/')}
                >
                    <Text style={styles.logoText}>Spelling Bad</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.progressBar}>
                    <View 
                        style={[
                            styles.progressFill, 
                            { width: `${((currentPage) / pages.length) * 100}%` }
                        ]} 
                    />
                </View>
                
                <Text style={styles.progressText}>
                    Soal {currentPage + 1} dari {pages.length}
                </Text>

                <View style={styles.questionCard}>
                    <Text style={styles.questionTitle}>
                        {pages[currentPage].question}
                    </Text>
                    
                    <View style={styles.sentenceContainer}>
                        <Text style={styles.sentence}>{pages[currentPage].qleft}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={inputValue}
                                onChangeText={setInputValue}
                                placeholder="Ketik jawaban..."
                                placeholderTextColor="#666"
                            />
                        </View>
                        <Text style={styles.sentence}>{pages[currentPage].qright}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.submitButton]}
                            onPress={checkAnswer}
                        >
                            <Text style={styles.buttonText}>Periksa Jawaban</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.resetButton]}
                            onPress={reset}
                        >
                            <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
                        </TouchableOpacity>
                    </View>

                    {isCorrect && (
                        <TouchableOpacity
                            style={[styles.button, styles.nextButton]}
                            onPress={nextPage}
                        >
                            <Text style={styles.buttonText}>
                                {currentPage === pages.length - 1 ? 'Selesai' : 'Lanjutkan'}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.hintButton}
                        onPress={() => setShowHint(!showHint)}
                    >
                        <Text style={styles.hintButtonText}>
                            {showHint ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk'}
                        </Text>
                    </TouchableOpacity>

                    {showHint && (
                        <View style={styles.hintContainer}>
                            <Text style={styles.hintText}>{pages[currentPage].hint}</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

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
    logoText: {
        color: '#0b0423',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 24,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#0b0423',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
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
    questionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0b0423',
        marginBottom: 24,
    },
    sentenceContainer: {
        marginBottom: 24,
    },
    sentence: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    inputContainer: {
        marginVertical: 12,
    },
    input: {
        height: 48,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#0b0423',
    },
    resetButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#0b0423',
    },
    nextButton: {
        backgroundColor: '#2e7d32',
        marginBottom: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    resetButtonText: {
        color: '#0b0423',
    },
    hintButton: {
        padding: 12,
        alignItems: 'center',
    },
    hintButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    hintContainer: {
        marginTop: 12,
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

export default SpellingActivity;