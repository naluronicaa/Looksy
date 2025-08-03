import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20, paddingBottom: 100 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#966D46',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#331307',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#966D46',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#966D46',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  responseBox: {
    backgroundColor: '#e8caad',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    maxHeight: 300,
  },
  responseText: {
    color: '#331307',
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#966D46',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
  },
  secondaryButtonText: {
    color: '#966D46',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});