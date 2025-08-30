import { Modal, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LookImageModal({ visible, imageUri, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View style={modalStyles.container}>
        <Image
          source={
            imageUri
              ? typeof imageUri === 'string'
                ? { uri: imageUri }
                : imageUri
              : require('../../../assets/placeholders/clothes-placeholder.jpg')
          }
          style={modalStyles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
          <Ionicons name="close-circle" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: height * 0.7,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
