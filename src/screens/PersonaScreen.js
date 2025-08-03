import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/persona-styles';
import { Ionicons } from '@expo/vector-icons';

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

const { width } = Dimensions.get('window');

export default function AvatarScreen() {
  const navigation = useNavigation();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleSelectAvatar = (avatarId) => {
    console.log(`Você selecionou o modelo ${avatarId}`);
    // navigation.navigate('ProximaTela');
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== currentAvatarIndex) {
      setCurrentAvatarIndex(newIndex);
    }
  };

  const handlePrevious = () => {
    let newIndex;
    if (currentAvatarIndex === 0) {
      newIndex = avatars.length - 1; // Volta para o último item
    } else {
      newIndex = currentAvatarIndex - 1;
    }
    scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
    setCurrentAvatarIndex(newIndex);
  };

  const handleNext = () => {
    let newIndex;
    if (currentAvatarIndex === avatars.length - 1) {
      newIndex = 0; // Volta para o primeiro item
    } else {
      newIndex = currentAvatarIndex + 1;
    }
    scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
    setCurrentAvatarIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha seu Avatar</Text>
        <Text style={styles.subtitle}>
          Selecione o avatar que mais combina com você para começar!
        </Text>

        <View style={styles.carouselWrapper}>
          <TouchableOpacity onPress={handlePrevious} style={styles.carouselArrow}>
            <Ionicons name="chevron-back" size={30} color="#5D4D47" />
          </TouchableOpacity>
          
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {avatars.map((avatar) => (
              <View key={avatar.id} style={styles.avatarCard}>
                <Image source={avatarImages[avatar.id]} style={styles.avatarImage} />
                <Text style={styles.avatarName}>{avatar.name}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={handleNext} style={styles.carouselArrow}>
            <Ionicons name="chevron-forward" size={30} color="#5D4D47" />
          </TouchableOpacity>
        </View>

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

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.skipBtn}>
          <Ionicons name="arrow-back" size={18} color="#966D46" />
          <Text style={styles.skipText}>Escolher depois</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}