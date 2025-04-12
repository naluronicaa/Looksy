import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWeatherByCoords } from '../../services/weatherServices';

const CACHE_KEY = 'weather_cache';
const CACHE_EXPIRATION_MINUTES = 60;

export default function WeatherInfo() {
  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [estacao, setEstacao] = useState('');
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const now = new Date();

        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const lastFetch = new Date(timestamp);
          const minutesPassed = (now - lastFetch) / 1000 / 60;

          if (minutesPassed < CACHE_EXPIRATION_MINUTES) {
            applyWeather(data);
            setLoading(false);
            return;
          }
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permissão de localização negada');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const clima = await getWeatherByCoords(latitude, longitude);

        await AsyncStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: clima, timestamp: now.toISOString() })
        );

        applyWeather(clima);
      } catch (err) {
        setError('Erro ao obter clima.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

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

  if (loading) return <ActivityIndicator size="large" color="#B76E79" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>📍 {cidade}</Text>
      <Text style={styles.text}>🌡️ {temperature}°C | {estacao}, {periodo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10, paddingHorizontal: 20 },
  text: { fontSize: 14, color: '#7A3B46' },
  errorText: { color: 'red', fontSize: 14, padding: 10 },
});
