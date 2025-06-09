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
import styles from '../../styles/lookscard-style';

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

