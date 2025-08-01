// src/components/looks/RecentLooksCarousel.js
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { listarLooksRecentes } from '../../services/looksService';
import { ActivityIndicator } from 'react-native';
import styles from '../../styles/looks-styles';

export default function RecentLooksCarousel({ onSelectLook }) {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarLooksRecentes = async () => {
    try {
      setLoading(true);
      const data = await listarLooksRecentes();
      setLooks(data);
    } catch (err) {
      console.log('Erro ao carregar looks recentes', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    carregarLooksRecentes();
  }, []);

  if (loading) {
    return (
        <View style={styles.carouselWrapper}>
          <Text style={styles.emptyText}>Carregando seus looks...</Text>
          <ActivityIndicator size="small" color="#966D46" />
        </View>
    );
  }


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
