// src/components/ClimaInfo.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { getWeatherByCoords } from '../../services/weatherServices';
import { Ionicons } from '@expo/vector-icons';
import styles  from '../../styles/weatherinfo-styles';

export default function WeatherInfo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    cidade: '',
    temperatura: null,
    estacao: '',
    periodo: '',
    dataFormatada: '',
  });

  useEffect(() => {
    formatarData();
    buscarClima();
  }, []);

  const formatarData = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('pt-BR', { month: 'long' });
    const weekday = now.toLocaleString('pt-BR', { weekday: 'long' });

    setData((prev) => ({
      ...prev,
      dataFormatada: `${weekday}, ${day} de ${month}`,
    }));
  };

  const buscarClima = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão de localização negada');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const clima = await getWeatherByCoords(latitude, longitude);

      const hora = new Date().getHours();
      const periodo = hora < 12 ? 'manhã' : hora < 18 ? 'tarde' : 'noite';
      const estacao = definirEstacao(new Date());

      setData((prev) => ({
        ...prev,
        cidade: clima.city_name,
        temperatura: clima.temp,
        periodo,
        estacao,
      }));
    } catch (err) {
      console.error(err);
      setError('Erro ao obter clima');
    } finally {
      setLoading(false);
    }
  };

  const definirEstacao = (date) => {
    const mes = date.getMonth() + 1;
    const dia = date.getDate();

    if ((mes === 12 && dia >= 21) || (mes <= 3 && (mes < 3 || dia < 20))) return 'verão';
    if ((mes === 3 && dia >= 20) || (mes <= 6 && (mes < 6 || dia < 21))) return 'outono';
    if ((mes === 6 && dia >= 21) || (mes <= 9 && (mes < 9 || dia < 23))) return 'inverno';
    return 'primavera';
  };

  if (loading) return <ActivityIndicator size="small" color="#966D46" style={{ marginTop: 5 }} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={18} color="#966D46" style={styles.icon} />
        <Text style={styles.text}>{data.dataFormatada}</Text>
      </View>
  
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={18} color="#966D46" style={styles.icon} />
        <Text style={styles.text}>{data.cidade}</Text>
      </View>
  
      <View style={styles.infoRow}>
        <Ionicons name="thermometer-outline" size={18} color="#966D46" style={styles.icon} />
        <Text style={styles.text}>
          {data.temperatura}°C | {data.estacao}, {data.periodo}
        </Text>
      </View>
    </View>
  );
}