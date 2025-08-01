import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginTop: 20, // Garante que não encoste na câmera/notch
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#966D46',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#331307',
  },
  email: {
    fontSize: 14,
    color: '#966D46',
  },
  optionsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8E1E7',
  },
  optionText: {
    fontSize: 16,
    color: '#331307',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#966D46',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#966D46',
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#966D46',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    marginTop: 10,
    color: '#966D46',
    fontSize: 14,
  },
  settingOption: {
    fontSize: 16,
    color: '#331307',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8E1E7',
    width: '100%',
    textAlign: 'center',
  },
  settingDescription: {
    fontSize: 13,
    color: '#331307',
    marginTop: 5,
    marginBottom: 8,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8E1E7',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#966D46',
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 13,
    color: '#331307',
    marginTop: 5,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8E1E7',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 8,
  },
  imageWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },

  cameraButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#966D46',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },

});
