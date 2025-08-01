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
        color: '#966D46',
        marginBottom: 10,
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#966D46',
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
        backgroundColor: '#966D46',
    },
    categoryButtonText: {
        color: '#966D46',
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
        backgroundColor: '#966D46',
    },
    itemText: {
        color: '#966D46',
        fontWeight: 'bold',
    },
    selectedItemText: {
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#966D46',
        borderRadius: 10,
        padding: 12,
        color: '#333',
        fontSize: 14,
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#966D46',
        marginBottom: 8,
    },
    summaryContainer: {
        backgroundColor: '#F8E1E7',
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
    },
    summaryText: {
        color: '#331307',
        marginBottom: 4,
        fontSize: 14,
    },
    imageButtonsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#966D46',
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
        backgroundColor: '#966D46',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 10,
    },
    checkboxText: {
        color: '#966D46',
        fontWeight: 'bold',
        fontSize: 13,
    },
    checkboxTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },

    icon: {
        marginRight: 6,
        marginTop: 1,
    },

});
