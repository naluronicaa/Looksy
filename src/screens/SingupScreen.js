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

import { criarUsuario, login as loginAPI, buscarUsuarioPorEmail } from '../services/userService';
import { useUsuario } from '../contexts/UserContext';

export default function SignupScreen() {
  const navigation = useNavigation();
  const { login: salvarContexto } = useUsuario();

  const [name, setName] = useState('');
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

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      await criarUsuario(name, email, password);

      const token = await loginAPI(email, password);

      const usuarioInfo = await buscarUsuarioPorEmail(email);
      salvarContexto({ ...usuarioInfo, token });
      navigation.reset({ index: 0, routes: [{ name: 'Form' }] });
    } catch (err) {
      Alert.alert('Erro ao cadastrar', err.response?.data?.message || err.message);
    }

  };

  return (
    <ImageBackground source={require('../../assets/bg.jpg')} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.brand}>Looksy</Text>
        <Text style={styles.slogan}>Crie sua Conta</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#966D46" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#966D46"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#966D46" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#966D46"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#966D46" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#966D46"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={() => promptGoogle()}>
          <Ionicons name="logo-google" size={20} color="#DB4437" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Cadastrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton} onPress={() => promptFacebook()}>
          <Ionicons name="logo-facebook" size={20} color="#1877F2" style={styles.facebookIcon} />
          <Text style={styles.facebookButtonText}>Cadastrar com Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
