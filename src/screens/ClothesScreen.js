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
  Dimensions,
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';

// Exemplo de peças (mock temporário, substitua depois por dados reais do SQLite)
const clothesData = [
  {
    id: '1',
    foto: require('../../assets/clothes-placeholder.jpg'),
    categoria: 'Parte de Cima',
    subtipo: 'Blusa',
    descricao: 'Blusa rosa com gola alta',
    usos: ['Trabalho', 'Eventos formais'],
  },
  {
    id: '2',
    foto: require('../../assets/clothes-placeholder.jpg'),
    categoria: 'Calçados',
    subtipo: 'Tênis',
    descricao: 'Tênis branco casual',
    usos: ['Passeio de dia', 'Férias'],
  },
  // Adicione mais mock data se quiser
];

export default function ClothesScreen() {
  const [search, setSearch] = useState('');

  const filteredClothes = clothesData.filter(
    (item) =>
      item.categoria.toLowerCase().includes(search.toLowerCase()) ||
      item.subtipo.toLowerCase().includes(search.toLowerCase()) ||
      item.descricao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Peças</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por categoria, tipo ou descrição..."
        placeholderTextColor="#B76E79"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredClothes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.foto} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.subtipo}</Text>
            <Text style={styles.cardDesc}>{item.descricao}</Text>
            <Text style={styles.cardUsos}>📍 {item.usos.join(', ')}</Text>
          </View>
        )}
      />

      <BottomNavBar activeTab="Roupas" />
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
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B76E79',
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
  cardUsos: {
    fontSize: 11,
    color: '#7A3B46',
    textAlign: 'center',
    marginTop: 4,
  },
});
