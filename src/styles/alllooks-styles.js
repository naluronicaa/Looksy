import { StyleSheet, Platform } from "react-native";


export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 35 : 10,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B76E79',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B76E79',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  uploadText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 13,
  },
  searchInput: {
    borderColor: '#B76E79',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#333',
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A3B46',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickText: {
    marginLeft: 8,
    color: '#B76E79',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B76E79',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    color: '#333',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#B76E79',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#B76E79',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#7A3B46',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontStyle: 'italic',
  },
});
