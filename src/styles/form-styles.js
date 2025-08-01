import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#966D46',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: '#331307',
        marginBottom: 25,
        textAlign: 'center'
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#331307',
        marginBottom: 12,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#966D46',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 15
    },
    button: {
        backgroundColor: '#966D46',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },
    backText: {
        color: '#966D46',
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#F8E1E7',
        borderRadius: 10
    },
    skipBtn: { marginTop: 25, flexDirection: 'row', alignItems: 'center' },
    skipBtnBottom: { marginTop: 30, flexDirection: 'row', alignItems: 'center' },
    skipText: { color: '#966D46', fontSize: 14, marginLeft: 6, fontWeight: 'bold' },
    questionImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 15, resizeMode: 'cover' },
})