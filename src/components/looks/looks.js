// src/components/looks/RecentLooksCarousel.js

import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; // 👈 aqui tá o segredo!

const looksData = [
  { id: '1', title: 'Look Social Elegante', img: require('../../../assets/clothes-placeholder.jpg') },
  { id: '2', title: 'Look Casual de Primavera', img: require('../../../assets/clothes-placeholder.jpg') },
  { id: '3', title: 'Look para Festa à Noite', img: require('../../../assets/clothes-placeholder.jpg') },
  { id: '4', title: 'Look de Trabalho Confortável', img: require('../../../assets/clothes-placeholder.jpg') },
  { id: '5', title: 'Look Estilo Streetwear', img: require('../../../assets/clothes-placeholder.jpg') },
];

export default function RecentLooksCarousel({ onSelectLook }) {
  return (
    <View style={styles.carouselWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
      >
        {looksData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => onSelectLook(item)}
          >
            <Image source={item.img} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
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
    padding: 12,                  // padding fixo
    borderRadius: 12,
    marginRight: 16,
    width: 150,                  // largura fixa
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
});
