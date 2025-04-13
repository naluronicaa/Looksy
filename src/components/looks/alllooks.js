import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function LookCard({ look }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={openModal}>
        <Image source={look.img} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{look.title}</Text>
        <Text style={styles.cardDesc}>{look.description}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            <Image source={look.img} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{look.title}</Text>
            <Text style={styles.modalDesc}>{look.description}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8E1E7',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  cardImage: {
    width: 110,
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7A3B46',
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 12,
    color: '#7A3B46',
    textAlign: 'center',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7A3B46',
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 14,
    color: '#7A3B46',
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#B76E79',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
