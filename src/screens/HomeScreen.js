// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView } from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const recommendedItems = [
  { id: '1', name: 'Vestido Floral', image: require('../../assets/clothes-placeholder.jpg') },
  { id: '2', name: 'Camisa Social', image: require('../../assets/clothes-placeholder.jpg') },
  { id: '3', name: 'Jaqueta de Couro', image: require('../../assets/clothes-placeholder.jpg') },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [showSubscriptionBanner, setShowSubscriptionBanner] = useState(false);

  useEffect(() => {
    const checkSubscriptionBanner = async () => {
      const hasSeenBanner = await AsyncStorage.getItem('seenSubscriptionBanner');
      if (!hasSeenBanner) {
        setShowSubscriptionBanner(true);
        await AsyncStorage.setItem('seenSubscriptionBanner', 'true');
      }
    };
    checkSubscriptionBanner();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá, Explore seus Looks!</Text>
      </View>
      
      {showSubscriptionBanner && (
        <View style={styles.subscriptionBanner}>
          <Text style={styles.subscriptionText}>Assine o plano premium e desbloqueie mais looks personalizados!</Text>
          <TouchableOpacity onPress={() => setShowSubscriptionBanner(false)}>
            <Ionicons name="close-circle" size={24} color="#B76E79" />
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.sectionTitle}>👗 Look do Dia com a Sky (IA)</Text>
      <View style={styles.lookContainer}>
        <Image source={require('../../assets/clothes-placeholder.jpg')} style={styles.lookImage} />
        <Text style={styles.lookDescription}>Look casual para um dia ensolarado!</Text>
      </View>
      
      <Text style={styles.sectionTitle}>⭐ Looks Favoritos</Text>
      <FlatList
        horizontal
        data={recommendedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />
      
      <BottomNavBar activeTab="Home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#B76E79' },
  subscriptionBanner: { flexDirection: 'row', backgroundColor: '#F8E1E7', padding: 10, marginHorizontal: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between' },
  subscriptionText: { flex: 1, fontSize: 14, color: '#7A3B46', marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#B76E79', marginLeft: 20, marginVertical: 10 },
  lookContainer: { alignItems: 'center', marginBottom: 20 },
  lookImage: { width: 200, height: 200, borderRadius: 10 },
  lookDescription: { fontSize: 14, color: '#7A3B46', marginTop: 5 },
  itemCard: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginHorizontal: 5, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  itemImage: { width: 100, height: 100, borderRadius: 10 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#7A3B46', textAlign: 'center' },
});
