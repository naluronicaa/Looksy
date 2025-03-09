// src/screens/FormScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function FormScreen() {
  const [style, setStyle] = useState('');
  const [occasions, setOccasions] = useState('');
  const [climate, setClimate] = useState('');

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Personalize seu estilo</Text>

        <TextInput style={styles.input} placeholder="Estilo (casual, formal...)" placeholderTextColor="#B76E79" value={style} onChangeText={setStyle} />
        <TextInput style={styles.input} placeholder="Ocasiões frequentes" placeholderTextColor="#B76E79" value={occasions} onChangeText={setOccasions} />
        <TextInput style={styles.input} placeholder="Clima predominante" placeholderTextColor="#B76E79" value={climate} onChangeText={setClimate} />

        <TouchableOpacity style={styles.button} onPress={() => console.log('Formulário enviado')}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#B76E79', marginBottom: 20 },
  input: { width: '100%', padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#B76E79', borderRadius: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#B76E79', padding: 10, borderRadius: 10, marginTop: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
