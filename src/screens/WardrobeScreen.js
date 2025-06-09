import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import { cadastrarRoupa } from '../services/clothesService';
import { useUsuario } from '../contexts/UserContext';
import styles from '../styles/wardrobe-style';

const categorias = {
  'Parte de Cima': ['Camiseta', 'Blusa', 'Casaco', 'Jaqueta'],
  'Parte de Baixo': ['Calça', 'Saia', 'Short'],
  'Calçados': ['Tênis', 'Bota', 'Sandália'],
  'Acessórios': ['Óculos', 'Chapéu', 'Bolsa', 'Jóias'],
  'Corpo Inteiro': ['Vestido', 'Macacão'],
};

export default function WardrobeScreen() {
  const [fotoUri, setFotoUri] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [subtipoSelecionado, setSubtipoSelecionado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [usosSelecionados, setUsosSelecionados] = useState([]);

  const { usuario } = useUsuario();

  const toggleUso = (item) => {
    if (usosSelecionados.includes(item)) {
      setUsosSelecionados(usosSelecionados.filter((u) => u !== item));
    } else {
      setUsosSelecionados([...usosSelecionados, item]);
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

  const handleCategoria = (categoria) => {
    if (categoria === categoriaSelecionada) {
      setCategoriaSelecionada(null);
      setSubtipoSelecionado('');
    } else {
      setCategoriaSelecionada(categoria);
      setSubtipoSelecionado('');
    }
  };

  const handleSubtipo = (subtipo) => {
    setSubtipoSelecionado((prev) => (prev === subtipo ? '' : subtipo));
  };

  const handleSalvar = async () => {
    if (!categoriaSelecionada || !subtipoSelecionado || usosSelecionados.length === 0) {
      Alert.alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const novaRoupa = {
        foto_uri: fotoUri,
        categoria: categoriaSelecionada,
        subtipo: subtipoSelecionado,
        descricao,
        usos: usosSelecionados,
      };

      const res = await cadastrarRoupa(novaRoupa);
      Alert.alert('Sucesso!', 'Peça salva com sucesso!');

      // Limpa os campos
      setFotoUri(null);
      setCategoriaSelecionada(null);
      setSubtipoSelecionado('');
      setDescricao('');
      setUsosSelecionados([]);
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

          {/* Botões de imagem */}
          <View style={styles.imageButtonsRow}>
            <TouchableOpacity style={styles.imageButton} onPress={handleImagem}>
              <Ionicons name="image-outline" size={22} color="#fff" />
              <Text style={styles.imageButtonText}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageButton} onPress={handleCamera}>
              <Ionicons name="camera-outline" size={22} color="#fff" />
              <Text style={styles.imageButtonText}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>

          {fotoUri && <Image source={{ uri: fotoUri }} style={styles.previewImage} />}

          {/* Categorias e subtipos */}
          {Object.keys(categorias).map((categoria) => (
            <View key={categoria} style={styles.categoryBlock}>
              <TouchableOpacity
                onPress={() => handleCategoria(categoria)}
                style={[
                  styles.categoryButton,
                  categoriaSelecionada === categoria && styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    categoriaSelecionada === categoria && styles.categoryButtonTextActive,
                  ]}
                >
                  {categoria}
                </Text>
              </TouchableOpacity>

              {categoriaSelecionada === categoria && (
                <FlatList
                  horizontal
                  data={categorias[categoria]}
                  keyExtractor={(item) => item}
                  showsHorizontalScrollIndicator={false}
                  style={styles.subtypeList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        subtipoSelecionado === item && styles.selectedItem,
                      ]}
                      onPress={() => handleSubtipo(item)}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          subtipoSelecionado === item && styles.selectedItemText,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          ))}

          {/* Usos */}
          <Text style={styles.summaryTitle}>Onde você costuma usar essa peça?</Text>
          <View style={styles.checkboxGroup}>
            {[
              'Trabalho',
              'Passeio de dia',
              'Esportes',
              'Eventos formais',
              'Encontros',
              'Balada',
              'Férias',
              'Casa',
              'Compras',
              'Escola/Faculdade',
              'Outros',
            ].map((item) => (
              <TouchableOpacity
                key={item}
                style={usosSelecionados.includes(item) ? styles.checkboxItemActive : styles.checkboxItem}
                onPress={() => toggleUso(item)}
              >
                <Text
                  style={
                    usosSelecionados.includes(item)
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Descrição */}
          <TextInput
            style={styles.input}
            placeholder="Descrição personalizada (ex: Vestido preto justo com brilho)"
            placeholderTextColor="#B76E79"
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />

          {/* Resumo */}
          <Text style={styles.summaryTitle}>Resumo da Peça</Text>
          <View style={styles.summaryContainer}>
            {fotoUri && (
              <View style={styles.summaryItem}>
                <Ionicons name="camera-outline" size={16} color="#B76E79" style={styles.icon} />
                <Text style={styles.summaryText}>Imagem adicionada</Text>
              </View>
            )}
            {categoriaSelecionada && (
              <View style={styles.summaryItem}>
                <Ionicons name="pricetag-outline" size={16} color="#B76E79" style={styles.icon} />
                <Text style={styles.summaryText}>Categoria: {categoriaSelecionada}</Text>
              </View>
            )}
            {subtipoSelecionado && (
              <View style={styles.summaryItem}>
                <Ionicons name="layers-outline" size={16} color="#B76E79" style={styles.icon} />
                <Text style={styles.summaryText}>Tipo: {subtipoSelecionado}</Text>
              </View>
            )}
            {descricao !== '' && (
              <View style={styles.summaryItem}>
                <Ionicons name="document-text-outline" size={16} color="#B76E79" style={styles.icon} />
                <Text style={styles.summaryText}>{descricao}</Text>
              </View>
            )}
            {usosSelecionados.length > 0 && (
              <View style={styles.summaryItem}>
                <Ionicons name="location-outline" size={16} color="#B76E79" style={styles.icon} />
                <Text style={styles.summaryText}>Usos: {usosSelecionados.join(', ')}</Text>
              </View>
            )}
          </View>


          {/* Botão salvar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>

        {!keyboardVisible && <BottomNavBar activeTab="Adicionar" />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}