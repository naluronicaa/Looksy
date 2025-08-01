import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherInfo from '../components/weather-info/WeatherInfo';
import RecentLooksCarousel from '../components/looks/looks';
import styles from '../styles/home-styles'

export default function HomeScreen() {
  const [showSubscriptionBanner, setShowSubscriptionBanner] = useState(false);
  const [selectedLook, setSelectedLook] = useState(null);

  useEffect(() => {
    checkSubscriptionBanner();
  }, []);

  const checkSubscriptionBanner = async () => {
    const hasSeenBanner = await AsyncStorage.getItem('seenSubscriptionBanner');
    if (!hasSeenBanner) {
      setShowSubscriptionBanner(true);
      await AsyncStorage.setItem('seenSubscriptionBanner', 'true');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Olá, Explore seus Looks!</Text>
        </View>

        <View style={styles.infoArea}>
          <WeatherInfo />
        </View>

        {showSubscriptionBanner && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Assine o plano premium e desbloqueie mais looks personalizados!
            </Text>
            <TouchableOpacity onPress={() => setShowSubscriptionBanner(false)}>
              <Ionicons name="close-circle" size={24} color="#966D46" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>☺︎ Look Recente</Text>
        {selectedLook ? (
          <View style={styles.mainLookArea}>
            <Image
              source={
                selectedLook.imagem_uri?.startsWith('data:image')
                  ? { uri: selectedLook.imagem_uri }
                  : require('../../assets/clothes-placeholder.jpg')
              }
              style={styles.mainLookImage}
            />
            <Text style={styles.mainLookTitle}>{selectedLook.titulo}</Text>
          </View>
        ) : (
          <Text style={[styles.mainLookTitle, { marginLeft: 20 }]}>
            Selecione um look abaixo para exibir aqui.
          </Text>
        )}

        <Text style={styles.sectionTitle}>❤︎ Looks que você curtiu recentemente</Text>
        <RecentLooksCarousel onSelectLook={(look) => setSelectedLook(look)} />
        
        {/* Espaço extra pra não colar na navbar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNavBar activeTab="Home" />
    </SafeAreaView>
  );
}
