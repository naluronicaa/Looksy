// src/screens/ExploreScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import styles from '../styles/explore-styles'

export default function ExploreScreen() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleSuggestion = () => {
    if (inputText.trim() === '') return;
    setResponse(`✨ Para: "${inputText}"\n\n👔 Look sugerido:\n• Camisa branca de linho\n• Calça de alfaiataria cinza\n• Mocassim marrom\n• Acessórios discretos\n\n🌤️ Clima atual: 27°C, ensolarado`);
  };

  const handleNewSuggestion = () => {
    // Gera nova sugestão (pode ser outra resposta estática)
    setResponse(`🌟 Nova sugestão:\n• Vestido midi floral\n• Sandália nude\n• Bolsa pequena transversal\n\n☁️ Clima: 24°C, parcialmente nublado`);
  };

  const handleSaveLook = () => {
    console.log("Look salvo:", response);
    alert("Look salvo com sucesso!");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Sky: Sua IA estilista</Text>
          <Text style={styles.subtitle}>Descreva a ocasião para receber uma sugestão:</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Preciso de um look para um jantar romântico hoje à noite em SP"
            placeholderTextColor="#B76E79"
            multiline
            value={inputText}
            onChangeText={setInputText}
          />

          <TouchableOpacity style={styles.button} onPress={handleSuggestion}>
            <Text style={styles.buttonText}>Sugerir Look</Text>
          </TouchableOpacity>

          {response !== '' && (
            <View style={styles.responseBox}>
              <ScrollView>
                <Text style={styles.responseText}>{response}</Text>
              </ScrollView>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleSaveLook}>
                  <Text style={styles.secondaryButtonText}>Salvar Look</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleNewSuggestion}>
                  <Text style={styles.secondaryButtonText}>Gerar Outro Look</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      <BottomNavBar activeTab="Explorar" />
    </SafeAreaView>
  );
}
