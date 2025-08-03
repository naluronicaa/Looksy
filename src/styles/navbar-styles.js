// src/styles/navbar-styles.js
import { StyleSheet, Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get('window').width;

// Crie uma função que recebe `insets` como argumento
export const getNavbarStyles = (insets) => StyleSheet.create({
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
    // Use o valor dinâmico aqui
    paddingBottom: insets.bottom,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: '#e8caad',
    marginTop: 4,
    fontWeight: 'bold',
  },
  activeNavText: {
    color: '#966D46', // Cor que você já está usando para o ativo
  },
  // ESTILO PARA O BOTÃO CENTRAL 'ADICIONAR'
  addButton: {
    backgroundColor: '#966D46', // Cor de fundo do botão
    width: 60,
    height: 60,
    borderRadius: 30, // Deixa o botão circular
    justifyContent: 'center',
    alignItems: 'center',
    // Mantenha essa margem para o botão subir, se quiser
    marginBottom: Platform.OS === 'ios' ? 30 : 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});