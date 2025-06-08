import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deletarLook } from '../../services/looksService';

export default function LookCard({ look, onDelete }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleDelete = async () => {
    Alert.alert('Excluir Look', 'Tem certeza que deseja excluir este look?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletarLook(look.id);
            closeModal();
            if (onDelete) onDelete(look.id);
          } catch (err) {
            console.log('Erro', err.response?.data?.message || err.message);
          }
        },
      },
    ]);
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={openModal}>
        <Image
          source={
            look.imagem_uri?.startsWith('data:image')
              ? { uri: look.imagem_uri }
              : look.img || require('../../../assets/clothes-placeholder.jpg')
          }
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>{look.titulo || look.title}</Text>
        <Text style={styles.cardDesc}>{look.descricao || look.description}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name='close-circle' size={28} color="#B76E79" />
            </TouchableOpacity>

            <Image
              source={
                look.imagem_uri?.startsWith('data:image')
                  ? { uri: look.imagem_uri }
                  : look.img || require('../../../assets/clothes-placeholder.jpg')
              }
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>{look.titulo || look.title}</Text>
            <Text style={styles.modalDesc}>{look.descricao || look.description}</Text>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={styles.deleteButtonText}>Excluir</Text>
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
    position: 'absolute',
    top: -14,
    right: -14,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 0,
    zIndex: 10,
    elevation: 6,
  },
  deleteButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DB3A34',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
