import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Contexto global do usuário
import { UserProvider } from './src/contexts/UserContext';

// Telas
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SingupScreen';
import FormScreen from './src/screens/FormScreen';
import WardrobeScreen from './src/screens/WardrobeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import HomeScreen from './src/screens/HomeScreen';
import AllLooksScreen from './src/screens/AllLooksScreen';
import ClothesScreen from './src/screens/ClothesScreen';
import PersonaScreen from './src/screens/PersonaScreen'
import CalendarScreen from './src/screens/CalendarScreen';
import LooksyPlusScreen from './src/screens/LooksyPlusScreen'

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Raleway-Regular': require('./assets/fonts/Raleway-VariableFont_wght.ttf'),
        'Raleway-Italic': require('./assets/fonts/Raleway-Italic-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#966D46" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
            <Stack.Screen name="Roupas" component={ClothesScreen} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
            <Stack.Screen name="Explorar" component={ExploreScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Looks" component={AllLooksScreen} />
            <Stack.Screen name="Adicionar" component={WardrobeScreen} />
            <Stack.Screen name="Persona" component={PersonaScreen} />
            <Stack.Screen name="Calendario" component={CalendarScreen} />
            <Stack.Screen name="LooksyPlus" component={LooksyPlusScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
