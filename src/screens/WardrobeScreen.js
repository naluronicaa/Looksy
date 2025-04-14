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
  

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria ou câmera.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
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

          {/* Botão de imagem */}
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

          {/* Categorias */}
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

          {/* Descrição personalizada */}
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
          </View>

          {/* Botão de salvar */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => Alert.alert('Peça salva com sucesso!')}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

        </ScrollView>
        {!keyboardVisible && <BottomNavBar activeTab="Roupas" />}
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
  
});
