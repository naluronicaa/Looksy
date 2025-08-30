import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#966D46',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#331307',
        marginBottom: 25,
        textAlign: 'center',
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#331307',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#966D46',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
        color: '#331307',
    },
    button: {
        backgroundColor: '#966D46',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
        minWidth: 120
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    backText: {
        color: '#966D46',
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#e8caad',
        borderRadius: 10,
    },
    skipBtn: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipBtnBottom: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipText: {
        color: '#966D46',
        fontSize: 14,
        marginLeft: 6,
        fontWeight: 'bold',
    },
    // Imagem de cada etapa
    questionImage: {
        width: 260,
        height: 260,
        borderRadius: 22,
        marginBottom: 22,
        backgroundColor: '#F6F0EB',
        alignSelf: 'center',
        overflow: 'hidden'
    },

    // Chips para sexo/biotipo
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 340,
        marginBottom: 10,
    },
    chip: {
        borderWidth: 1,
        borderColor: '#966D46',
        backgroundColor: '#fff',
        borderRadius: 22,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginHorizontal: 8,
        marginVertical: 8,
        minWidth: 130,
        alignItems: 'center',
    },

    chipSelected: {
        backgroundColor: '#e8caad',
        borderColor: '#966D46',
    },
    chipText: {
        color: '#966D46',
        fontWeight: '600',
        fontSize: 15,
    },
    chipTextSelected: {
        color: '#331307',
        fontWeight: 'bold',
    },
    // Review do formulário
    reviewLabel: {
        fontSize: 17,
        color: '#966D46',
        marginBottom: 6,
        fontWeight: '600',
    },
    reviewValue: {
        color: '#331307',
        fontWeight: 'bold',
        fontSize: 17,
    },
});
