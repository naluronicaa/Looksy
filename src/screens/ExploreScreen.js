// src/screens/ExploreScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';

const products = [
  { id: '1', name: 'Jaqueta Jeans', brand: 'Zara', price: 'R$ 199,90', image: require('../../assets/clothes-placeholder.jpg') },
  { id: '2', name: 'Tênis Branco', brand: 'Nike', price: 'R$ 349,90', image: require('../../assets/clothes-placeholder.jpg') },
  { id: '3', name: 'Blusa de Tricô', brand: 'H&M', price: 'R$ 159,90', image: require('../../assets/clothes-placeholder.jpg') },
  { id: '4', name: 'Calça Skinny', brand: "Levi's", price: 'R$ 299,90', image: require('../../assets/clothes-placeholder.jpg') },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const filteredProducts = products.filter(item =>
    (selectedBrand === '' || item.brand.toLowerCase().includes(selectedBrand.toLowerCase())) &&
    (selectedPrice === '' || parseFloat(item.price.replace('R$', '').replace(',', '.')) <= parseFloat(selectedPrice)) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Explore Novos Looks</Text>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Busque roupas..."
            placeholderTextColor="#B76E79"
            value={search}
            onChangeText={setSearch}
          />

          <View style={styles.filtersContainer}>
            <TextInput
              style={styles.filterInput}
              placeholder="Marca"
              placeholderTextColor="#B76E79"
              value={selectedBrand}
              onChangeText={setSelectedBrand}
            />
            <TextInput
              style={styles.filterInput}
              placeholder="Preço Máx (R$)"
              placeholderTextColor="#B76E79"
              keyboardType="numeric"
              value={selectedPrice}
              onChangeText={setSelectedPrice}
            />
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.rowContainer}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: isKeyboardVisible ? 20 : 100 }}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
      {!isKeyboardVisible && <BottomNavBar activeTab="Explorar" style={styles.navbar} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#B76E79', marginBottom: 20, textAlign: 'center' },
  searchInput: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#B76E79', borderRadius: 10, backgroundColor: '#fff', marginBottom: 10 },
  filtersContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  filterInput: { width: '48%', padding: 10, borderWidth: 1, borderColor: '#B76E79', borderRadius: 10, backgroundColor: '#fff' },
  rowContainer: { justifyContent: 'space-between' },
  productCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5, alignItems: 'center', width: '48%' },
  productImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#7A3B46', textAlign: 'center' },
  productBrand: { fontSize: 14, color: '#B76E79', textAlign: 'center' },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#B76E79', textAlign: 'center' },
  navbar: { position: 'absolute', bottom: 0, width: '100%' },
});
