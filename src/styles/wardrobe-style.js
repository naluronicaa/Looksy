import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: { 
        flex: 1, 
        backgroundColor: '#fff', 
        padding: 20, 
        alignItems: 'center', 
        paddingBottom: 80, // Ajustado para evitar sobreposição com a navbar
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#B76E79', 
        marginBottom: 20,
        marginTop: 20, // Ajustado para evitar ficar colado na câmera/notch
    },
    categoryContainer: { 
        marginBottom: 20, 
        width: '100%' 
    },
    categoryTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#B76E79', 
        marginBottom: 10 
    },
    item: { 
        padding: 10, 
        backgroundColor: '#F8E1E7', 
        borderRadius: 10, 
        marginHorizontal: 5 
    },
    selectedItem: { 
        backgroundColor: '#B76E79' 
    },
    selectedItemText: { 
        color: '#fff', 
        fontWeight: 'bold' 
    },
    itemText: { 
        color: '#B76E79', 
        fontWeight: 'bold' 
    },
    summaryTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#B76E79', 
        marginTop: 20 
    },
    summaryContainer: { 
        marginTop: 10, 
        alignItems: 'center' 
    },
    summaryText: { 
        fontSize: 16, 
        color: '#333' 
    },
});