import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherInfo from '../components/weather-info/WeatherInfo';
import RecentLooksCarousel from '../components/looks/looks';

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
              <Ionicons name="close-circle" size={24} color="#B76E79" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>☺︎ Look Recente</Text>
        {selectedLook ? (
          <View style={styles.mainLookArea}>
            <Image source={selectedLook.img} style={styles.mainLookImage} />
            <Text style={styles.mainLookTitle}>{selectedLook.title}</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B76E79',
  },
  infoArea: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#7A3B46',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#F8E1E7',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    color: '#7A3B46',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B76E79',
    marginLeft: 20,
    marginTop: 10,
  },
  mainLookArea: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mainLookImage: {
    width: 200,
    height: 260,
    borderRadius: 10,
  },
  mainLookTitle: {
    fontSize: 14,
    color: '#7A3B46',
    marginTop: 5,
    textAlign: 'center',
  }
});
