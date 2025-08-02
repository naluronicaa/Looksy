import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff', // Fundo branco
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D4D47', // Marrom Café - Cor escura
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#966D46', // Marrom Acinzentado - Cor clara
    marginBottom: 40,
    textAlign: 'center',
  },
  carouselContainer: {
    height: width * 0.8, // Altura do carrossel baseada na largura da tela
  },
  carouselContent: {
    alignItems: 'center',
  },
  avatarCard: {
    width: width * 0.7, // Largura de cada "card" do avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.05, // Espaçamento entre os cards
  },
  avatarImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2, // Para imagens circulares
    resizeMode: 'cover',
    marginBottom: 20,
  },
  avatarName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4D47',
  },
  button: {
    backgroundColor: '#966D46', // Cor do botão
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
  // Estilos para a paginação (pontinhos)
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
});
;