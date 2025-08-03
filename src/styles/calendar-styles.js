import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  header: {
    // AQUI ESTÁ A MUDANÇA PRINCIPAL
    // Agora o header vai ser um container de coluna
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinha o conteúdo à esquerda
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#966D46',
    marginBottom: 10, // Adiciona um espaço abaixo do título
  },
  headerButtons: {
    // Este container agora vai ser uma linha para os botões
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinha os botões à esquerda
  },
  generateButton: {
    backgroundColor: '#966D46',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10, // Mudei para `marginRight` para dar espaço entre eles
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  // O restante dos seus estilos permanece o mesmo...
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#d9e1e8',
    borderRadius: 8,
    marginBottom: 20,
    padding: 5,
  },
  lookContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e8caad',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 10,
  },
  lookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D4D47',
    marginBottom: 10,
  },
  lookDescription: {
    fontSize: 16,
    color: '#331307',
    textAlign: 'center',
    marginBottom: 15,
  },
  lookImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});