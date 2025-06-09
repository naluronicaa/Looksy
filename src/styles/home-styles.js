import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B76E79',
  },
  infoArea: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#7A3B46',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#F8E1E7',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    color: '#7A3B46',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B76E79',
    marginLeft: 20,
    marginTop: 10,
  },
  mainLookArea: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mainLookImage: {
    width: 200,
    height: 260,
    borderRadius: 10,
  },
  mainLookTitle: {
    fontSize: 14,
    color: '#7A3B46',
    marginTop: 5,
    textAlign: 'center',
  }
});