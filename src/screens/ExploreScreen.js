// src/screens/ExploreScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';

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

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20, paddingBottom: 100 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B76E79',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#7A3B46',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#B76E79',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#B76E79',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  responseBox: {
    backgroundColor: '#F8E1E7',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    maxHeight: 300,
  },
  responseText: {
    color: '#7A3B46',
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#B76E79',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
  },
  secondaryButtonText: {
    color: '#B76E79',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
