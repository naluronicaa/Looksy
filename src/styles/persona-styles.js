// src/styles/persona-styles.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D4D47',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#966D46',
    marginBottom: 40,
    textAlign: 'center',
  },
  carouselWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.8,
  },
  carouselArrow: {
    paddingHorizontal: 10,
  },
  // REMOVA O ESTILO carouselContainer DAQUI, se existir
  // carouselContainer: {
  //   height: width * 0.8,
  // },
  // carouselContent: {
  //   alignItems: 'center',
  // },
  avatarCard: {
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
  },
  avatarImage: {
    width: width * 0.6,
    height: width * 0.8,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  avatarName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4D47',
  },
  button: {
    backgroundColor: '#966D46',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#966D46',
    opacity: 0.3,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    opacity: 1,
  },
  skipBtn: { marginTop: 25, flexDirection: 'row', alignItems: 'center' },
  skipText: { color: '#966D46', fontSize: 14, marginLeft: 6, fontWeight: 'bold' },
});