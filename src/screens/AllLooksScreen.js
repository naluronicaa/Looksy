// src/screens/AllLooksScreen.js
import React, { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/navigation-bar/NavBar';
import LookCard from '../components/looks/alllooks';

const looksData = [
  { id: '1', title: 'Look Executivo', description: 'Para reuniões formais.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '2', title: 'Look Verão Casual', description: 'Fresco e estiloso.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '3', title: 'Look Balada', description: 'Para arrasar à noite.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '4', title: 'Look Confortável', description: 'Dia a dia com estilo.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '5', title: 'Look Criativo', description: 'Cheio de atitude.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '6', title: 'Look Esportivo', description: 'Chic e prático.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '7', title: 'Look Festa Dia', description: 'Elegância suave.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '8', title: 'Look Streetwear', description: 'Autêntico e urbano.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '9', title: 'Look Romântico', description: 'Delicado e fofo.', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '10', title: 'Look Fashion Week', description: 'Para brilhar nas passarelas.', img: require('../../assets/clothes-placeholder.jpg') },
];

export default function AllLooksScreen() {
  const [search, setSearch] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setUploadedImage(result.assets[0].uri);
      Alert.alert('Imagem enviada com sucesso!');
    }
  };

  const filteredLooks = looksData.filter((look) =>
    look.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Todos os Looks</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
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

      {/* Preview da imagem enviada */}
      {uploadedImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>🖼️ Imagem enviada:</Text>
          <Image source={{ uri: uploadedImage }} style={styles.previewImage} />
        </View>
      )}

      {/* Lista de Looks */}
      <FlatList
        data={filteredLooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => <LookCard look={item} />}
      />


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
  previewContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  previewLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#7A3B46',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // espaço para navbar
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#F8E1E7',
    width: cardWidth,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7A3B46',
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 12,
    color: '#7A3B46',
    textAlign: 'center',
    marginTop: 4,
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
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1, // mantém imagem quadrada
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover', // ou 'contain' se quiser mostrar tudo
  },  
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A3B46',
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 14,
    color: '#7A3B46',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#B76E79',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});
