import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import { cadastrarRoupa } from '../services/clothesService';
import { cadastrarRoupaIA } from '../services/iaService'; // IA aqui!
import { useUsuario } from '../contexts/UserContext';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/wardrobe-style';

const categoriaList = ['Parte de Cima', 'Parte de Baixo', 'Calçados', 'Acessórios', 'Corpo Inteiro'];
const subtipoList = ['Camiseta', 'Blusa', 'Casaco', 'Jaqueta', 'Calça', 'Saia', 'Short', 'Tênis', 'Bota', 'Sandália', 'Óculos', 'Chapéu', 'Bolsa', 'Jóias', 'Vestido', 'Macacão'];
const corList = ['Preto', 'Branco', 'Cinza', 'Azul', 'Verde', 'Vermelho', 'Amarelo', 'Rosa', 'Bege', 'Marrom', 'Colorido'];
const tecidoList = ['Algodão', 'Linho', 'Poliéster', 'Jeans', 'Couro', 'Sintético', 'Viscose', 'Outro'];
const estacaoList = ['Verão', 'Inverno', 'Primavera', 'Outono', 'Qualquer'];
const ocasiaoList = ['Trabalho', 'Passeio de dia', 'Esportes', 'Formal', 'Encontro', 'Balada', 'Férias', 'Casa', 'Escola', 'Outros'];
const generoList = ['Feminino', 'Masculino', 'Neutro'];
const faixaEtariaList = ['Jovem', 'Adulto', 'Maduro', 'Qualquer'];

export default function WardrobeScreen() {
  const [fotoUri, setFotoUri] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [subtipo, setSubtipo] = useState('');
  const [cor, setCor] = useState('');
  const [tecido, setTecido] = useState('');
  const [estacao, setEstacao] = useState('');
  const [ocasiao, setOcasiao] = useState('');
  const [genero, setGenero] = useState('');
  const [faixaEtaria, setFaixaEtaria] = useState('');
  const [marca, setMarca] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [descricao, setDescricao] = useState('');
  const [recusada, setRecusada] = useState('0');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loadingIA, setLoadingIA] = useState(false);

  const { usuario } = useUsuario();

  const handleImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      setFotoUri(result.assets[0].uri);
      Alert.alert('Imagem carregada com sucesso!');
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      setFotoUri(result.assets[0].uri);
      Alert.alert('Foto tirada com sucesso!');
    }
  };

  // Cadastro automático IA:
  const handleAutoCadastroIA = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });
    if (result.canceled || result.assets.length === 0) return;

    const imagemSelecionada = result.assets[0];
    setFotoUri(imagemSelecionada.uri);
    setLoadingIA(true);

    try {
      // IA espera imagem pública (ou local + backend que aceita upload).
      // Aqui mandamos o base64 como campo imagem_url.
      const iaResponse = await cadastrarRoupaIA({
        imagem_url: `data:image/jpeg;base64,${imagemSelecionada.base64}`
      });
      // IA retorna atributos (ajuste conforme o backend)
      const atributos = iaResponse.atributos || {};

      setCategoria(atributos.categoria || '');
      setSubtipo(atributos.subtipo || atributos.nome || '');
      setCor(atributos.cor || '');
      setTecido(atributos.tecido || '');
      setEstacao(atributos.estacao_ideal || '');
      setOcasiao(atributos.ocasiao_especifica || '');
      setGenero(atributos.genero_uso || '');
      setFaixaEtaria(atributos.faixa_etaria_uso || '');
      setMarca(atributos.marca || '');
      setDetalhes(atributos.detalhes || '');
      setDescricao(atributos.descricao || '');
      setRecusada('0');
      setLoadingIA(false);

      Alert.alert('Atributos sugeridos!', 'Confira os campos antes de salvar.');
    } catch (error) {
      setLoadingIA(false);
      Alert.alert('Erro na IA', error.response?.data?.message || error.message || 'Erro ao classificar imagem.');
    }
  };

  const handleSalvar = async () => {
    if (!categoria || !subtipo || !cor || !tecido || !estacao || !genero) {
      Alert.alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const novaRoupa = {
        foto_uri: fotoUri,
        categoria,
        subtipo,
        cor,
        tecido,
        estacao_ideal: estacao,
        ocasiao_especifica: ocasiao,
        genero_uso: genero,
        faixa_etaria_uso: faixaEtaria,
        marca,
        detalhes,
        descricao,
        recusada: parseInt(recusada) || 0
      };

      await cadastrarRoupa(novaRoupa);
      Alert.alert('Sucesso!', 'Peça salva com sucesso!');

      // Limpa os campos
      setFotoUri(null);
      setCategoria('');
      setSubtipo('');
      setCor('');
      setTecido('');
      setEstacao('');
      setOcasiao('');
      setGenero('');
      setFaixaEtaria('');
      setMarca('');
      setDetalhes('');
      setDescricao('');
      setRecusada('0');
    } catch (error) {
      Alert.alert('Erro ao salvar roupa', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Salvar sua Peça de Roupa</Text>

          <View style={styles.imageButtonsRow}>
            <TouchableOpacity style={styles.imageButton} onPress={handleImagem}>
              <Ionicons name="image-outline" size={22} color="#fff" />
              <Text style={styles.imageButtonText}>Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={handleCamera}>
              <Ionicons name="camera-outline" size={22} color="#fff" />
              <Text style={styles.imageButtonText}>Tirar Foto</Text>
            </TouchableOpacity>
            {/* Botão de cadastro automático IA */}
            <TouchableOpacity style={styles.autoButton} onPress={handleAutoCadastroIA}>
              <Ionicons name="sparkles-outline" size={22} color="#fff" />
              <Text style={styles.imageButtonText}>Cadastro Automático</Text>
            </TouchableOpacity>
          </View>

          {loadingIA && (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <ActivityIndicator color="#966D46" size="large" />
              <Text style={{ color: '#966D46', marginTop: 5 }}>A IA está analisando sua imagem...</Text>
            </View>
          )}

          {fotoUri && <Image source={{ uri: fotoUri }} style={styles.previewImage} />}

          {/* ...restante dos pickers e campos, igual ao código anterior... */}
          {/* ...coloque todos os campos dos pickers e TextInputs aqui (igual ao anterior)... */}
          
          {/* ...copie aqui o restante dos campos de categoria, subtipo, cor, tecido, etc, como no seu código anterior ... */}

          {/* Campos em dropdown */}
          <Text style={styles.label}>Categoria *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={categoria}
              onValueChange={setCategoria}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {categoriaList.map(c => <Picker.Item key={c} label={c} value={c} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Tipo/Subtipo *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={subtipo}
              onValueChange={setSubtipo}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {subtipoList.map(s => <Picker.Item key={s} label={s} value={s} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Cor *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={cor}
              onValueChange={setCor}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {corList.map(c => <Picker.Item key={c} label={c} value={c} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Tecido *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={tecido}
              onValueChange={setTecido}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {tecidoList.map(t => <Picker.Item key={t} label={t} value={t} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Estação ideal *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={estacao}
              onValueChange={setEstacao}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {estacaoList.map(e => <Picker.Item key={e} label={e} value={e} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Ocasião</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={ocasiao}
              onValueChange={setOcasiao}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {ocasiaoList.map(o => <Picker.Item key={o} label={o} value={o} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Gênero de uso *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={genero}
              onValueChange={setGenero}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {generoList.map(g => <Picker.Item key={g} label={g} value={g} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Faixa etária</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={faixaEtaria}
              onValueChange={setFaixaEtaria}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color="#aaa" />
              {faixaEtariaList.map(f => <Picker.Item key={f} label={f} value={f} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Zara"
            value={marca}
            onChangeText={setMarca}
          />
          <Text style={styles.label}>Detalhes</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Gola alta, com botões, etc."
            value={detalhes}
            onChangeText={setDetalhes}
          />
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição personalizada da peça"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
          <Text style={styles.label}>Recusada</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantidade de recusas"
            value={recusada}
            onChangeText={setRecusada}
            keyboardType="number-pad"
            maxLength={3}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
        {!keyboardVisible && <BottomNavBar activeTab="Adicionar" />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
