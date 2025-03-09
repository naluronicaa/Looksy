import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import styles from '../styles/wardrobe-style';

const categories = {
  tops: ['Camiseta', 'Casaco', 'Jaqueta'],
  bottoms: ['Calça', 'Saia', 'Shorts'],
  shoes: ['Bota', 'Tênis', 'Sandália'],
  accessories: ['Óculos', 'Chapéu', 'Relógio'],
};

export default function WardrobeScreen() {
  const [selectedItems, setSelectedItems] = useState({
    tops: null,
    bottoms: null,
    shoes: null,
    accessories: null,
  });

  const selectItem = (category, item) => {
    setSelectedItems((prev) => ({ ...prev, [category]: item }));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Monte seu Look</Text>
        
        {Object.keys(categories).map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
            <FlatList
              horizontal
              data={categories[category]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, selectedItems[category] === item && styles.selectedItem]}
                  onPress={() => selectItem(category, item)}>
                  <Text style={[styles.itemText, selectedItems[category] === item && styles.selectedItemText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}

        <Text style={styles.summaryTitle}>Seu Look</Text>
        <View style={styles.summaryContainer}>
          {Object.keys(selectedItems).map((category) => (
            <Text key={category} style={styles.summaryText}>
              {selectedItems[category] ? `${category}: ${selectedItems[category]}` : `${category}: Nenhum selecionado`}
            </Text>
          ))}
        </View>
        
        <BottomNavBar activeTab="Roupas" />
      </View>
    </SafeAreaView>
  );
}