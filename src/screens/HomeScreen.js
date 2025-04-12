// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getWeatherByCoords } from '../services/weatherServices';

const looksData = [
  { id: '1', title: 'Look Social Elegante', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '2', title: 'Look Casual de Primavera', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '3', title: 'Look para Festa à Noite', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '4', title: 'Look de Trabalho Confortável', img: require('../../assets/clothes-placeholder.jpg') },
  { id: '5', title: 'Look Estilo Streetwear', img: require('../../assets/clothes-placeholder.jpg') },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const [showSubscriptionBanner, setShowSubscriptionBanner] = useState(false);
  const [dateFormatted, setDateFormatted] = useState('');
  const [selectedLook, setSelectedLook] = useState(looksData[0]);

  const [loadingWeather, setLoadingWeather] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [cidade, setCidade] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [estacao, setEstacao] = useState('');
  const [errorWeather, setErrorWeather] = useState('');

  useEffect(() => {
    formatDate();
    checkSubscriptionBanner();
    fetchWeather();
  }, []);

  const formatDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('pt-BR', { month: 'long' });
    const weekday = now.toLocaleString('pt-BR', { weekday: 'long' });
    setDateFormatted(`${weekday}, ${day} de ${month}`);
  };

  const checkSubscriptionBanner = async () => {
    const hasSeenBanner = await AsyncStorage.getItem('seenSubscriptionBanner');
    if (!hasSeenBanner) {
      setShowSubscriptionBanner(true);
      await AsyncStorage.setItem('seenSubscriptionBanner', 'true');
    }
  };

  const fetchWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorWeather('Permissão de localização negada');
        setLoadingWeather(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const clima = await getWeatherByCoords(latitude, longitude);
      applyWeather(clima);
    } catch (err) {
      setErrorWeather('Erro ao obter clima');
      console.error(err);
    } finally {
      setLoadingWeather(false);
    }
  };

  const applyWeather = (clima) => {
    setTemperature(clima.temp);
    setCidade(clima.city_name);

    const hora = new Date().getHours();
    setPeriodo(hora < 12 ? 'manhã' : hora < 18 ? 'tarde' : 'noite');
    setEstacao(getEstacao(new Date()));
  };

  const getEstacao = (date) => {
    const mes = date.getMonth() + 1;
    const dia = date.getDate();

    if ((mes === 12 && dia >= 21) || (mes <= 3 && (mes < 3 || dia < 20))) return 'verão';
    if ((mes === 3 && dia >= 20) || (mes <= 6 && (mes < 6 || dia < 21))) return 'outono';
    if ((mes === 6 && dia >= 21) || (mes <= 9 && (mes < 9 || dia < 23))) return 'inverno';
    return 'primavera';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá, Explore seus Looks!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
          <Ionicons name="cart-outline" size={24} color="#B76E79" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoArea}>
        <Text style={styles.dateText}>📅 {dateFormatted}</Text>

        {loadingWeather ? (
          <ActivityIndicator size="small" color="#B76E79" />
        ) : errorWeather ? (
          <Text style={styles.errorText}>{errorWeather}</Text>
        ) : (
          <>
            <Text style={styles.dateText}>📍 {cidade}</Text>
            <Text style={styles.dateText}>🌡️ {temperature}°C | {estacao}, {periodo}</Text>
          </>
        )}
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

      <Text style={styles.sectionTitle}>👗 Look do Dia com a Sky (IA)</Text>
      <View style={styles.mainLookArea}>
        <Image source={selectedLook.img} style={styles.mainLookImage} />
        <Text style={styles.mainLookTitle}>{selectedLook.title}</Text>
      </View>

      <Text style={styles.sectionTitle}>👀 Looks que você curtiu recentemente</Text>
      <FlatList
        horizontal
        data={looksData}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => setSelectedLook(item)}
          >
            <Image source={item.img} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

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
    height: 200,
    borderRadius: 10,
  },
  mainLookTitle: {
    fontSize: 14,
    color: '#7A3B46',
    marginTop: 5,
    textAlign: 'center',
  },
  carouselContainer: {
    paddingLeft: 20,
    paddingVertical: 10,
    paddingBottom: 80, // espaço para navbar
  },
  cardContainer: {
    backgroundColor: '#F8E1E7',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 15,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7A3B46',
    textAlign: 'center',
  },
});
