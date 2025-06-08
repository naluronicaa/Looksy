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
  StyleSheet,
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

const categorias = {
  'Parte de Cima': ['Camiseta', 'Blusa', 'Casaco', 'Jaqueta'],
  'Parte de Baixo': ['Calça', 'Saia', 'Short'],
  'Calçados': ['Tênis', 'Bota', 'Sandália'],
  'Acessórios': ['Óculos', 'Boné', 'Relógio'],
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
            {fotoUri && <Text style={styles.summaryText}>📸 Imagem adicionada</Text>}
            {categoriaSelecionada && <Text style={styles.summaryText}>Categoria: {categoriaSelecionada}</Text>}
            {subtipoSelecionado && <Text style={styles.summaryText}>Tipo: {subtipoSelecionado}</Text>}
            {descricao !== '' && <Text style={styles.summaryText}>📝 {descricao}</Text>}
            {usosSelecionados.length > 0 && (
              <Text style={styles.summaryText}>📍 Usos: {usosSelecionados.join(', ')}</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 60, // garante que o conteúdo não grude na navbar
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B76E79',
    marginBottom: 10,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B76E79',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    aspectRatio: 4 / 5, // formato vertical (como no Instagram)
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  categoryBlock: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#F8E1E7',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryButtonActive: {
    backgroundColor: '#B76E79',
  },
  categoryButtonText: {
    color: '#B76E79',
    fontWeight: 'bold',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  subtypeList: {
    marginTop: 10,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#F8E1E7',
    marginRight: 10,
  },
  selectedItem: {
    backgroundColor: '#B76E79',
  },
  itemText: {
    color: '#B76E79',
    fontWeight: 'bold',
  },
  selectedItemText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B76E79',
    borderRadius: 10,
    padding: 12,
    color: '#333',
    fontSize: 14,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B76E79',
    marginBottom: 8,
  },
  summaryContainer: {
    backgroundColor: '#F8E1E7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  },
  summaryText: {
    color: '#7A3B46',
    marginBottom: 4,
    fontSize: 14,
  },
  imageButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#B76E79',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  checkboxItem: {
    backgroundColor: '#F8E1E7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
  },
  checkboxItemActive: {
    backgroundColor: '#B76E79',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
  },
  checkboxText: {
    color: '#B76E79',
    fontWeight: 'bold',
    fontSize: 13,
  },
  checkboxTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
