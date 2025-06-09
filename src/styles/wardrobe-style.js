import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 30 : 10,
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 60, // garante que o conteúdo não grude na navbar
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#B76E79',
        marginBottom: 10,
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B76E79',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    imageButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    previewImage: {
        width: '100%',
        aspectRatio: 4 / 5, // formato vertical (como no Instagram)
        borderRadius: 10,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    categoryBlock: {
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#F8E1E7',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    categoryButtonActive: {
        backgroundColor: '#B76E79',
    },
    categoryButtonText: {
        color: '#B76E79',
        fontWeight: 'bold',
    },
    categoryButtonTextActive: {
        color: '#fff',
    },
    subtypeList: {
        marginTop: 10,
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#F8E1E7',
        marginRight: 10,
    },
    selectedItem: {
        backgroundColor: '#B76E79',
    },
    itemText: {
        color: '#B76E79',
        fontWeight: 'bold',
    },
    selectedItemText: {
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#B76E79',
        borderRadius: 10,
        padding: 12,
        color: '#333',
        fontSize: 14,
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B76E79',
        marginBottom: 8,
    },
    summaryContainer: {
        backgroundColor: '#F8E1E7',
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
    },
    summaryText: {
        color: '#7A3B46',
        marginBottom: 4,
        fontSize: 14,
    },
    imageButtonsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#B76E79',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    checkboxItem: {
        backgroundColor: '#F8E1E7',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 10,
    },
    checkboxItemActive: {
        backgroundColor: '#B76E79',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 10,
    },
    checkboxText: {
        color: '#B76E79',
        fontWeight: 'bold',
        fontSize: 13,
    },
    checkboxTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
});
