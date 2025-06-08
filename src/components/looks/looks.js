// src/components/looks/RecentLooksCarousel.js
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { listarLooksRecentes } from '../../services/looksService';

export default function RecentLooksCarousel({ onSelectLook }) {
  const [looks, setLooks] = useState([]);

  const carregarLooksRecentes = async () => {
    try {
      const data = await listarLooksRecentes();
      setLooks(data);
    } catch (err) {
      console.log('Erro ao carregar looks recentes', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    carregarLooksRecentes();
  }, []);

  if (!looks.length) {
    return (
      <View style={styles.carouselWrapper}>
        <Text style={styles.emptyText}>Você ainda não cadastrou looks recentes.</Text>
      </View>
    );
  }

  return (
    <View style={styles.carouselWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
      >
        {looks.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => onSelectLook?.(item)}
          >
            <Image
              source={
                item.imagem_uri?.startsWith('data:image')
                  ? { uri: item.imagem_uri }
                  : require('../../../assets/clothes-placeholder.jpg')
              }
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>{item.titulo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  carouselContent: {
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F8E1E7',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 110,
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7A3B46',
    textAlign: 'center',
  },
  emptyText: {
    color: '#7A3B46',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontStyle: 'italic',
  },
});
