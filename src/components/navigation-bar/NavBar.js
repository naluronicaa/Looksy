import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function BottomNavBar ({ activeTab }) {
  const navigation = useNavigation();

  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Looks', icon: 'shirt-outline' },
    { name: 'Roupas', icon: 'camera-outline' },
    { name: 'Explorar', icon: 'chatbubble-ellipses-outline' },
    { name: 'Perfil', icon: 'person-outline' },
  ];

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.navItem}
          onPress={() => navigation.navigate(tab.name)}>
          <Ionicons
            name={tab.icon}
            size={25}
            color={activeTab === tab.name ? '#B76E79' : '#e8afb7'}
          />
          <Text
            style={[styles.navText, activeTab === tab.name && styles.activeNavText]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: '#e8afb7',
    marginTop: 4,
    fontWeight: 'bold',
  },
  activeNavText: {
    color: '#B76E79',
  },
});