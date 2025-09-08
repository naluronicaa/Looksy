import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import styles from '../styles/explore-styles';
import { useUsuario } from '../contexts/UserContext';
import { sugerirLookIA } from '../services/iaService';
import WeatherInfo from '../components/WeatherInfo';

export default function ExploreScreen() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [imagemBase64, setImagemBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [querOusadia, setQuerOusadia] = useState(false);

  // Estado para armazenar clima
  const [clima, setClima] = useState({
    cidade: '',
    temperatura: null,
    estacao: '',
    periodo: '',
    dataFormatada: '',
  });

  const { usuario } = useUsuario();

  // Recebe os dados do clima do WeatherInfo
  const handleClimaUpdate = (dados) => {
    setClima(dados);
  };

  const handleSuggestion = async () => {
    if (inputText.trim() === '') return;
    if (!usuario) {
      Alert.alert('Erro', 'Faça login para usar esta função.');
      return;
    }
    if (clima.temperatura === null) {
      Alert.alert('Clima', 'Espere carregar o clima antes de sugerir um look.');
      return;
    }

    setLoading(true);
    setResponse('');
    setImagemBase64(null);

    try {
      const data = {
        prompt_usuario: inputText,
        genero: usuario.sexo || 'feminino',
        idade: usuario.idade ? parseInt(usuario.idade) : 25,
        biotipo: usuario.biotipo || 'médio',
        temperatura: clima.temperatura,
        local_evento: clima.cidade || 'São Paulo',
        data_evento: new Date().toISOString().split('T')[0] + 'T18:00:00',
        quer_ousadia: querOusadia,
      };

      const res = await sugerirLookIA(data);

      setResponse(res.sugestao_texto || '');
      setImagemBase64(res.imagem_base64 || null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro', err.response?.data?.message || err.message || 'Erro ao gerar look');
    }
  };

  const handleNewSuggestion = () => {
    handleSuggestion();
  };

  const handleSaveLook = () => {
    if (!response) return;
    Alert.alert('Look salvo!', 'Sua sugestão foi salva com sucesso!');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Sky: Sua IA estilista</Text>
          <Text style={styles.subtitle}>Descreva a ocasião para receber uma sugestão:</Text>

          {/* Clima do usuário */}
          <WeatherInfo onClimaUpdate={handleClimaUpdate} />

          <TextInput
            style={styles.input}
            placeholder="Ex: Preciso de um look para um jantar romântico hoje à noite em SP"
            placeholderTextColor="#966D46"
            multiline
            value={inputText}
            onChangeText={setInputText}
          />

          {/* Switch de ousadia */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ color: '#966D46', fontSize: 15, marginRight: 10 }}>
              Quero um look ousado
            </Text>
            <Switch
              value={querOusadia}
              onValueChange={setQuerOusadia}
              trackColor={{ false: '#e8caad', true: '#966D46' }}
              thumbColor={querOusadia ? '#fff' : '#fff'}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSuggestion} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Gerando...' : 'Sugerir Look'}</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator size="large" color="#966D46" style={{ marginTop: 18 }} />
          )}

          {response !== '' && (
            <View style={styles.responseBox}>
              <ScrollView>
                <Text style={styles.responseText}>{response}</Text>
              </ScrollView>

              {imagemBase64 && (
                <Image
                  source={{ uri: 'data:image/png;base64,' + imagemBase64 }}
                  style={{ width: 220, height: 220, alignSelf: 'center', borderRadius: 18, marginVertical: 10 }}
                  resizeMode="contain"
                />
              )}

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
