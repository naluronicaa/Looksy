// src/screens/RecentLooksCarousel.js
import React from 'react';
import { 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

const looksData = [
  { id: '1', title: 'Look Social Elegante', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '2', title: 'Look Casual de Primavera', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '3', title: 'Look para Festa à Noite', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '4', title: 'Look de Trabalho Confortável', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '5', title: 'Look Estilo Streetwear', img: require('../../assets/clothes-placeholder.jpg') },
];

export default function RecentLooksCarousel() {
  return (
    <SafeAreaView style={styles.carouselWrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true} 
        contentContainerStyle={styles.carouselContent}
      >
        {looksData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={item.img} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    height: 250, // Altura fixa para forçar o espaço de rolagem
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  carouselContent: {
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F8E1E7',   // Rosa clarinho
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 15,
    width: 170,                 // Largura maior para forçar a rolagem
    alignItems: 'center',
    // Sombra (para iOS e Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 110,
    height: 110,
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
