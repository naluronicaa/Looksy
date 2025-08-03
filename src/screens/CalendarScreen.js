// src/screens/CalendarScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import styles from '../styles/calendar-styles';
import BottomNavBar from '../components/navigation-bar/NavBar';
import LookImageModal from '../components/look-calendar/LookImageModal'

// Simulação de dados para os looks do dia
const dailyLooks = {
  '2025-08-01': {
    title: 'Look Casual de Sexta-feira',
    description: 'Calça jeans, camiseta branca e tênis. Perfeito para um dia relaxado.',
    image: require('../../assets/placeholders/clothes-placeholder.jpg'),
  },
  '2025-08-05': {
    title: 'Look de Trabalho Elegante',
    description: 'Blazer bege, calça de alfaiataria e sapatilha. Profissional e confortável.',
    image: require('../../assets/placeholders/clothes-placeholder.jpg'),
  },
  '2025-08-10': {
    title: 'Look para Jantar',
    description: 'Vestido preto, salto alto e bolsa de mão. Look clássico e elegante.',
    image: require('../../assets/placeholders/clothes-placeholder.jpg'),
  },
};

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [lookDoDia, setLookDoDia] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para lidar com a seleção de um dia
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setLookDoDia(dailyLooks[day.dateString] || null); // Verifica se há um look para o dia
  };

  // Objeto para marcar os dias no calendário
  const markedDates = {};

  // 1. Marca os dias que já têm um look com uma bolinha
  Object.keys(dailyLooks).forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: '#5D4D47', // Cor da bolinha
      // Se este dia também estiver selecionado, adicione a cor de seleção
      ...(selectedDate === date && { selected: true, selectedColor: '#5D4D47', selectedTextColor: '#fff' })
    };
  });

  // 2. Garante que o dia selecionado (caso não tenha look) também seja marcado
  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#5D4D47',
      selectedTextColor: '#fff',
    };
  }

  const handleGenerateLooks = () => {
    Alert.alert(
      'Gerar Looks da Semana',
      'Esta funcionalidade será implementada em uma próxima tela. 😊'
    );
  };
  
  const handleImagePress = () => {
    if (lookDoDia && lookDoDia.image) {
      setIsModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Calendário</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.generateButton} onPress={handleGenerateLooks}>
            <Text style={styles.generateButtonText}>Gerar Looks da semana</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.generateButton} onPress={() => navigation.navigate('Looks')}>
            <Text style={styles.generateButtonText}>Todos os Looks</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={styles.calendar}
          theme={{
            calendarBackground: '#fff',
            textSectionTitleColor: '#966D46',
            selectedDayBackgroundColor: '#5D4D47',
            selectedDayTextColor: '#fff',
            todayTextColor: '#966D46',
            dayTextColor: '#5D4D47',
            textDisabledColor: '#d9e1e8',
            dotColor: '#5D4D47',
            arrowColor: '#5D4D47',
            monthTextColor: '#5D4D47',
            textMonthFontWeight: 'bold',
          }}
        />

        {lookDoDia && (
          <View style={styles.lookContainer}>
            <Text style={styles.lookTitle}>{lookDoDia.title}</Text>
            <Text style={styles.lookDescription}>{lookDoDia.description}</Text>
            <TouchableOpacity onPress={handleImagePress}>
              <Image source={lookDoDia.image} style={styles.lookImage} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <BottomNavBar activeTab="Calendario" />
      <LookImageModal
        visible={isModalVisible}
        imageUri={lookDoDia?.image}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}