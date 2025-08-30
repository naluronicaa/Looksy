import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/navigation-bar/NavBar';
import LookCard from '../components/looks/alllooks';
import { listarLooks, cadastrarLook } from '../services/looksService';
import { useUsuario } from '../contexts/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/alllooks-styles';

export default function AllLooksScreen() {
  const [search, setSearch] = useState('');
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataUso, setDataUso] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { usuario } = useUsuario();

  const carregarLooks = async () => {
    try {
      setLoading(true);
      const data = await listarLooks();
      setLooks(data);
    } catch (err) {
      console.log('Erro ao carregar looks', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLooks();
  }, []);

  const handleOpenModal = () => {
    setImageUri(null);
    setTitulo('');
    setDescricao('');
    const now = new Date();
    // Sempre inicializa para hoje, hora zero, sem bug de UTC
    setDataUso(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    setModalVisible(true);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      const uri = `data:image/jpeg;base64,${base64}`;
      setImageUri(uri);
    }
  };

  const handleEnviarLook = async () => {
    if (!imageUri || !titulo.trim()) {
      Alert.alert('Preencha todos os campos e selecione uma imagem.');
      return;
    }

    try {
      const novoLook = {
        usuario_id: usuario.id,
        imagem_uri: imageUri,
        titulo,
        descricao,
        origem: 'Manual',
        data_uso: dataUso, // Sempre data local
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
        placeholderTextColor="#966D46"
        value={search}
        onChangeText={setSearch}
      />

      {/* Lista de Looks ou Loading */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#966D46" />
        </View>
      ) : (
        <FlatList
          data={filteredLooks}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContainer}
          renderItem={({ item }) => (
            <LookCard
              look={item}
              onDelete={(deletedId) => {
                setLooks((prev) => prev.filter((l) => l.id !== deletedId));
              }}
            />
          )}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={styles.emptyText}>
                Você ainda não possui nenhum look salvo!
              </Text>
            </View>
          }
        />
      )}

      {/* Modal Enviar Look */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Look</Text>

            <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
              <Ionicons name="image-outline" size={20} color="#966D46" />
              <Text style={styles.pickText}>Selecionar Imagem</Text>
            </TouchableOpacity>

            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.modalImage} />
            )}

            <TextInput
              style={styles.input}
              placeholder="Título do Look"
              placeholderTextColor="#966D46"
              value={titulo}
              onChangeText={setTitulo}
            />

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Descrição"
              placeholderTextColor="#966D46"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            {/* Data de uso */}
            <Text style={styles.label}>Data de uso</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={18} color="#966D46" />
              <Text style={styles.dateButtonText}>
                {dataUso.toLocaleDateString('pt-BR')}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dataUso}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    // Sempre cria nova data local zerada
                    const localDate = new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate()
                    );
                    setDataUso(localDate);
                  }
                }}
              />
            )}

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
