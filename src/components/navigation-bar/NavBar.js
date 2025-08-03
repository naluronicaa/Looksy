import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';

import { getNavbarStyles } from '../../styles/navbar-styles'; 

export default function BottomNavBar ({ activeTab }) {
  const navigation = useNavigation();

  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Looks', icon: 'bookmark-outline' },
    { name: 'Roupas', icon: 'shirt-outline' },
    { name: 'Calendario', icon: 'calendar-outline' },
    { name: 'Explorar', icon: 'chatbubble-ellipses-outline' },
    { name: 'Perfil', icon: 'person-outline' },
  ];

  const insets = useSafeAreaInsets();
  const styles = getNavbarStyles(insets);

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
            color={activeTab === tab.name ? '#af845cff' : '#e8caad'}
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

