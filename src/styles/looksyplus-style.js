import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço para a barra de navegação inferior
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#966D46', // Cor clara
  },
  cardContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4D47', // Cor escura
    marginBottom: 8,
  },
  metricText: {
    fontSize: 16,
    color: '#331307',
  },
  warningCard: {
    backgroundColor: '#e8caad', // Cor clara para o aviso
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d9e1e8',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4D47',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 16,
    color: '#331307',
    marginBottom: 5,
  },
  donateButton: {
    backgroundColor: '#966D46',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});