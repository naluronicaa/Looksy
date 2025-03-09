import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    card: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5, alignItems: 'center' },
    brand: { fontSize: 32, fontWeight: 'bold', color: '#B76E79', marginBottom: 5, fontFamily: 'Raleway-Regular' },
    slogan: { fontSize: 16, fontStyle: 'italic', color: '#e8afb7', marginBottom: 20 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#B76E79', borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 },
    input: { flex: 1, padding: 10, color: '#666' },
    icon: { marginRight: 10 },
    button: { backgroundColor: '#B76E79', padding: 10, borderRadius: 10, marginTop: 10, width: '100%', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    googleButton: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 10, marginTop: 10, width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DB4437' },
    googleIcon: { marginRight: 10 },
    googleButtonText: { color: '#DB4437', fontSize: 16, fontWeight: 'bold' },
    facebookButton: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 10, marginTop: 10, width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#1877F2' },
    facebookIcon: { marginRight: 10 },
    facebookButtonText: { color: '#1877F2', fontSize: 16, fontWeight: 'bold' },
    linkText: { color: '#e8afb7', marginTop: 10, fontSize: 14 },
  });