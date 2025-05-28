// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import styles from '../styles/styles';

import { login as loginAPI, buscarUsuarioPorEmail } from '../services/usuarioService';
import { useUsuario } from '../contexts/UserContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useUsuario(); // do UserContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [requestGoogle, responseGoogle, promptGoogle] = Google.useAuthRequest({
    expoClientId: 'SEU_EXPO_CLIENT_ID',
    androidClientId: 'SEU_ANDROID_CLIENT_ID',
    iosClientId: 'SEU_IOS_CLIENT_ID',
  });

  const [requestFacebook, responseFacebook, promptFacebook] = Facebook.useAuthRequest({
    clientId: 'SEU_FACEBOOK_CLIENT_ID',
  });

  const handleLogin = async () => {
    try {
      const token = await loginAPI(email, password);
      const userData = await buscarUsuarioPorEmail(email); // já usa o token no header
      login({ ...userData, token }); // salva no contexto global
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Erro no login', err.response?.data?.message || err.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/bg.jpg')} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.brand}>Looksy</Text>
        <Text style={styles.slogan}>Moda Inteligente e Personalizada</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#B76E79" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#B76E79"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#B76E79" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#B76E79"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={() => promptGoogle()}>
          <Ionicons name="logo-google" size={20} color="#DB4437" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton} onPress={() => promptFacebook()}>
          <Ionicons name="logo-facebook" size={20} color="#1877F2" style={styles.facebookIcon} />
          <Text style={styles.facebookButtonText}>Entrar com Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
