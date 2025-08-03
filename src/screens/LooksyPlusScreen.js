import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/looksyplus-style';
import BottomNavBar from '../components/navigation-bar/NavBar';

export default function LooksyPlusScreen() {
  const navigation = useNavigation();

  // Dados fictícios para a tela de métricas
  const usoDoGuardaRoupa = 45; // Porcentagem de uso nos últimos 3 meses
  const itemParaDoacao = {
    nome: 'Jaqueta de Couro Preta',
    recusas: 12, // Número de vezes que a peça foi recusada
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Métricas de Uso</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.metricTitle}>Uso do Guarda-Roupa</Text>
          <Text style={styles.metricText}>
            Nos últimos 3 meses, você usou {usoDoGuardaRoupa}% das suas roupas.
          </Text>
        </View>

        {itemParaDoacao.recusas > 10 && (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>Aviso</Text>
            <Text style={styles.warningText}>
              Você recusou a peça "{itemParaDoacao.nome}" mais de{' '}
              {itemParaDoacao.recusas} vezes.
            </Text>
            <Text style={styles.warningText}>
              Talvez seja uma boa ideia doá-la.
            </Text>
            <TouchableOpacity
              style={styles.donateButton}
              onPress={() => Alert.alert('Ação', 'Função de doação em breve!')}
            >
              <Text style={styles.donateButtonText}>Saiba mais</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BottomNavBar activeTab="Explorar" />
    </SafeAreaView>
  );
}