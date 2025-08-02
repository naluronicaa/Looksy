import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/persona-styles'; 

// Importe as imagens dos avatares aqui
// As chaves devem ser os IDs dos avatares para facilitar a referência
const avatarImages = {
  '1': require('../../assets/profiles/profile1.png'),
  '2': require('../../assets/profiles/profile2.png'),
  '3': require('../../assets/profiles/profile3.png'),
};

const avatars = [
  { id: '1', name: 'Modelo 1' },
  { id: '2', name: 'Modelo 2' },
  { id: '3', name: 'Modelo 3' },
];

const { width } = Dimensions.get('window'); // Pega a largura da tela para o carrossel

export default function AvatarScreen() {
  const navigation = useNavigation();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleSelectAvatar = (avatarId) => {
    // Por enquanto, apenas o console.log como você pediu
    console.log(`Você selecionou o modelo ${avatarId}`);
    // No futuro, aqui você salvaria a escolha do usuário
    // e navegaria para a próxima tela
    // navigation.navigate('ProximaTela');
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentAvatarIndex(newIndex);
  };
  
  // Função para lidar com o comportamento de "voltar" ao primeiro item no final
  const handleNextPress = () => {
    let nextIndex = (currentAvatarIndex + 1) % avatars.length;
    scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
    setCurrentAvatarIndex(nextIndex);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha seu Avatar</Text>
        <Text style={styles.subtitle}>
          Selecione o avatar que mais combina com você para começar!
        </Text>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
          contentContainerStyle={styles.carouselContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {avatars.map((avatar, index) => (
            <View key={avatar.id} style={styles.avatarCard}>
              <Image source={avatarImages[avatar.id]} style={styles.avatarImage} />
              <Text style={styles.avatarName}>{avatar.name}</Text>
            </View>
          ))}
        </ScrollView>
        
        {/* Adicionando botões de navegação para o carrossel */}
        <View style={styles.paginationContainer}>
          {avatars.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentAvatarIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelectAvatar(avatars[currentAvatarIndex].id)}
        >
          <Text style={styles.buttonText}>Escolher este</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}