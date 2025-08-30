import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/looksyplus-style';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { getDashboardResumo } from '../services/dashService';

export default function LooksyPlusScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    const carregarDashboard = async () => {
      setLoading(true);
      try {
        const dados = await getDashboardResumo();
        setResumo(dados);
      } catch (err) {
        Alert.alert('Erro ao buscar métricas', err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarDashboard();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Métricas de Uso</Text>
        </View>

        {loading || !resumo ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator color="#966D46" size="large" />
          </View>
        ) : (
          <>
            <View style={styles.cardContainer}>
              <Text style={styles.metricTitle}>Looks com IA</Text>
              <Text style={styles.metricText}>
                Você já gerou <Text style={styles.metricNumber}>{resumo.looks_com_ia}</Text> look{resumo.looks_com_ia === 1 ? '' : 's'} com a ajuda da IA.
              </Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.metricTitle}>Looks cadastrados manualmente</Text>
              <Text style={styles.metricText}>
                Você salvou <Text style={styles.metricNumber}>{resumo.looks_manualmente}</Text> look{resumo.looks_manualmente === 1 ? '' : 's'} sem IA.
              </Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.metricTitle}>Peças usadas via IA</Text>
              <Text style={styles.metricText}>
                A IA já te ajudou a usar <Text style={styles.metricNumber}>{resumo.pecas_usadas_ia}</Text> peça{resumo.pecas_usadas_ia === 1 ? '' : 's'} diferente{resumo.pecas_usadas_ia === 1 ? '' : 's'} do seu guarda-roupa.
              </Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.metricTitle}>Looks nos últimos 7 dias</Text>
              <Text style={styles.metricText}>
                Você usou <Text style={styles.metricNumber}>{resumo.looks_ultimos_7_dias}</Text> look{resumo.looks_ultimos_7_dias === 1 ? '' : 's'} na última semana.
              </Text>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.metricTitle}>Total de peças cadastradas</Text>
              <Text style={styles.metricText}>
                Seu guarda-roupa tem <Text style={styles.metricNumber}>{resumo.total_pecas}</Text> peça{resumo.total_pecas === 1 ? '' : 's'} cadastrada{resumo.total_pecas === 1 ? '' : 's'}.
              </Text>
            </View>

            {/* Mostrar sugestão de doação se houver roupas muito recusadas */}
            {resumo.roupas_muito_recusadas > 0 && (
              <View style={styles.warningCard}>
                <Text style={styles.warningTitle}>Sugestão de Doação</Text>
                <Text style={styles.warningText}>
                  {resumo.roupas_muito_recusadas === 1
                    ? `Uma peça foi recusada mais de 10 vezes:`
                    : `${resumo.roupas_muito_recusadas} peças foram recusadas mais de 10 vezes:`}
                </Text>
                {resumo.nomes_roupas_muito_recusadas.map((nome, idx) => (
                  <Text key={idx} style={[styles.warningText, { fontWeight: 'bold' }]}>
                    {nome}
                  </Text>
                ))}
                <Text style={styles.warningText}>
                  Que tal pensar em doar ou reciclar essas peças? :)
                </Text>
                <TouchableOpacity
                  style={styles.donateButton}
                  onPress={() => Alert.alert('Ação', 'Função de doação em breve!')}
                >
                  <Text style={styles.donateButtonText}>Saiba mais</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
}
