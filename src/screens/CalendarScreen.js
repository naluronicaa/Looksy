import React, { useState, useEffect } from 'react';
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
import LookImageModal from '../components/look-calendar/LookImageModal';
import { listarLooks } from '../services/looksService';

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [lookDoDia, setLookDoDia] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [looksPorData, setLooksPorData] = useState({});
  const [loading, setLoading] = useState(true);

  // Carrega looks do backend e agrupa por data_uso ('YYYY-MM-DD')
  useEffect(() => {
    const carregarLooks = async () => {
      setLoading(true);
      try {
        const data = await listarLooks();
        // Agrupa looks por data_uso no formato string
        const porData = {};
        data.forEach(look => {
          if (look.data_uso) {
            // Garante que é só o dia (YYYY-MM-DD), ignora hora se vier
            const dataDia = look.data_uso.length > 10 ? look.data_uso.slice(0, 10) : look.data_uso;
            if (!porData[dataDia]) porData[dataDia] = [];
            porData[dataDia].push(look);
          }
        });
        setLooksPorData(porData);
      } catch (err) {
        Alert.alert('Erro ao carregar looks', err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    carregarLooks();
  }, []);

  // Ao selecionar uma data
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // Sempre 'YYYY-MM-DD'
    setLookDoDia(null);
  };

  // Marcação no calendário
  const markedDates = {};
  Object.keys(looksPorData).forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: '#5D4D47',
      ...(selectedDate === date && { selected: true, selectedColor: '#5D4D47', selectedTextColor: '#fff' })
    };
  });
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

        {loading ? (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 24 }}>
            <Text style={{ color: '#966D46', fontSize: 17 }}>Carregando...</Text>
          </View>
        ) : selectedDate && looksPorData[selectedDate] ? (
          <View style={styles.lookContainer}>
            <Text style={[styles.lookTitle, { marginBottom: 4 }]}>
              Looks para o dia {selectedDate}
            </Text>
            <Text style={{ color: '#966D46', fontSize: 15, marginBottom: 14, textAlign: 'center', fontWeight: 'bold' }}>
              Esse dia tem {looksPorData[selectedDate].length} look{looksPorData[selectedDate].length > 1 ? 's' : ''}
            </Text>
            {/* Lista VERTICAL de looks */}
            {looksPorData[selectedDate].map((look, idx) => (
              <TouchableOpacity
                key={look.id || idx}
                onPress={() => {
                  setLookDoDia(look);
                  setIsModalVisible(true);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                  backgroundColor: '#fff9f2',
                  borderRadius: 14,
                  padding: 10,
                  elevation: 2
                }}
              >
                <Image
                  source={
                    look.imagem_uri
                      ? { uri: look.imagem_uri }
                      : require('../../assets/placeholders/clothes-placeholder.jpg')
                  }
                  style={[styles.lookImage, { width: 85, height: 85, borderRadius: 12, marginRight: 15 }]}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.lookTitle, { fontSize: 15, marginBottom: 2 }]} numberOfLines={2}>
                    {look.titulo}
                  </Text>
                  <Text style={{ color: '#331307', fontSize: 13 }}>{look.descricao}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : selectedDate ? (
          <View style={styles.lookContainer}>
            <Text style={{ color: '#966D46', fontSize: 16, marginTop: 24, textAlign: 'center' }}>
              Nenhum look registrado para esse dia ainda.
            </Text>
          </View>
        ) : null}


      </ScrollView>
      <BottomNavBar activeTab="Calendario" />
      <LookImageModal
        visible={isModalVisible}
        imageUri={lookDoDia?.imagem_uri}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}
