import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/navigation-bar/NavBar';
import LookCard from '../components/looks/alllooks';
import { listarLooks, cadastrarLook } from '../services/looksService';

export default function AllLooksScreen() {
  const [search, setSearch] = useState('');
  const [looks, setLooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const carregarLooks = async () => {
    try {
      const data = await listarLooks();
      setLooks(data);
    } catch (err) {
      Alert.alert('Erro ao carregar looks', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    carregarLooks();
  }, []);

  const handleOpenModal = () => {
    setImageUri(null);
    setTitulo('');
    setDescricao('');
    setModalVisible(true);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleEnviarLook = async () => {
    if (!imageUri || !titulo.trim() || !descricao.trim()) {
      Alert.alert('Preencha todos os campos e selecione uma imagem.');
      return;
    }

    try {
      const novoLook = {
        imagem_uri: imageUri,
        titulo,
        descricao,
      };

      await cadastrarLook(novoLook);
      Alert.alert('Look cadastrado com sucesso!');
      setModalVisible(false);
      carregarLooks();
    } catch (err) {
      Alert.alert('Erro ao enviar look', err.response?.data?.message || err.message);
    }
  };

  const filteredLooks = looks.filter((look) =>
    look.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Todos os Looks</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleOpenModal}>
          <Ionicons name="camera-outline" size={22} color="#fff" />
          <Text style={styles.uploadText}>Enviar Look</Text>
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar look..."
        placeholderTextColor="#B76E79"
        value={search}
        onChangeText={setSearch}
      />

      {/* Lista de Looks */}
      <FlatList
        data={filteredLooks}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <LookCard look={item} onDelete={(deletedId) => {
            setLooks((prev) => prev.filter((l) => l.id !== deletedId));
          }} />
        )}
      />

      {/* Modal Enviar Look */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Look</Text>

            <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
              <Ionicons name="image-outline" size={20} color="#B76E79" />
              <Text style={styles.pickText}>Selecionar Imagem</Text>
            </TouchableOpacity>

            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.modalImage} />
            )}

            <TextInput
              style={styles.input}
              placeholder="Título do Look"
              placeholderTextColor="#B76E79"
              value={titulo}
              onChangeText={setTitulo}
            />

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Descrição"
              placeholderTextColor="#B76E79"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleEnviarLook}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavBar activeTab="Looks" />
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 60) / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 35 : 10,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B76E79',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B76E79',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  uploadText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 13,
  },
  searchInput: {
    borderColor: '#B76E79',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#333',
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A3B46',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickText: {
    marginLeft: 8,
    color: '#B76E79',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B76E79',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    color: '#333',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#B76E79',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#B76E79',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
