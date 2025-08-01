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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { listarRoupas, deletarRoupa } from '../services/clothesService';
import { styles } from '../styles/clothes-styles';

export default function ClothesScreen() {
  const [search, setSearch] = useState('');
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const carregarRoupas = async () => {
    try {
      setLoading(true);
      const data = await listarRoupas();
      setClothes(data);
    } catch (err) {
      Alert.alert('Erro ao carregar roupas', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const removerRoupa = async (id) => {
    Alert.alert('Remover roupa', 'Deseja realmente excluir esta peça?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletarRoupa(id);
            setClothes((prev) => prev.filter((r) => r.id !== id));
          } catch (err) {
            Alert.alert('Erro ao excluir', err.response?.data?.message || err.message);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    carregarRoupas();
  }, []);

  const filteredClothes = clothes.filter(
    (item) =>
      item.categoria.toLowerCase().includes(search.toLowerCase()) ||
      item.subtipo.toLowerCase().includes(search.toLowerCase()) ||
      item.descricao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Guarda-Roupa</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('Adicionar')}>
          <Ionicons name="camera-outline" size={22} color="#fff" />
          <Text style={styles.uploadText}>Enviar Roupa</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por categoria, tipo ou descrição..."
        placeholderTextColor="#966D46"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#966D46" />
        </View>
      ) : (
        <FlatList
          data={filteredClothes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={
                  item.foto_uri?.startsWith('file')
                    ? { uri: item.foto_uri }
                    : require('../../assets/clothes-placeholder.jpg')
                }
                style={styles.cardImage}
              />
              <View style={styles.infoRow}>
                <Text style={styles.cardTitle}>{item.subtipo}</Text>
              </View>

              {item.descricao?.trim() !== '' && (
                <View style={styles.infoRow}>
                  <Ionicons name="document-text-outline" size={14} color="#331307" style={styles.icon} />
                  <Text style={styles.cardDesc}>{item.descricao}</Text>
                </View>
              )}

              {item.usos?.length > 0 && (
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={14} color="#331307" style={styles.icon} />
                  <Text style={styles.cardUsos}>{item.usos.join(', ')}</Text>
                </View>
              )}

              <TouchableOpacity onPress={() => removerRoupa(item.id)} style={styles.infoRow}>
                <Ionicons name="trash-outline" size={14} color="#966D46" style={styles.icon} />
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={styles.emptyText}>
                Você ainda não possui nenhuma roupa salva!
              </Text>
            </View>
          }
        />
      )}

      <BottomNavBar activeTab="Roupas" />
    </SafeAreaView>
  );
}
