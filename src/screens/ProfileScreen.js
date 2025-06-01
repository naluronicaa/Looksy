// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/profile-styles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useUsuario } from '../contexts/UserContext';
import {
  atualizarUsuario,
  trocarSenha,
} from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { usuario, logout } = useUsuario();

  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [modalNotificationVisible, setModalNotificationVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const [newUsername, setNewUsername] = useState(usuario?.nome || '');
  const [newEmail, setNewEmail] = useState(usuario?.email || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [notificationTime, setNotificationTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const saveProfile = async () => {
    try {
      await atualizarUsuario(usuario.id, newUsername, newEmail);
      Alert.alert('Perfil atualizado com sucesso!');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erro ao atualizar perfil', error.response?.data?.message || error.message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await trocarSenha(usuario.id, currentPassword, newPassword);
      Alert.alert('Senha atualizada com sucesso!');
      setModalPasswordVisible(false);
    } catch (error) {
      Alert.alert('Erro ao trocar senha', error.response?.data?.message || error.message);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    logout(); // limpa contexto
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image source={require('../../assets/profile-placeholder.jpg')} style={styles.profileImage} />
          <Text style={styles.username}>{usuario?.nome}</Text>
          <Text style={styles.email}>{usuario?.email}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem} onPress={() => setModalVisible(true)}>
            <Ionicons name="pencil-outline" size={24} color="#B76E79" />
            <Text style={styles.optionText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Looks')}>
            <Ionicons name="shirt-outline" size={24} color="#B76E79" />
            <Text style={styles.optionText}>Meus Looks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="diamond-outline" size={24} color="#B76E79" />
            <Text style={styles.optionText}>Looksy+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Form')}>
            <Ionicons name="document-text-outline" size={24} color="#B76E79" />
            <Text style={styles.optionText}>Questionário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => setSettingsVisible(true)}>
            <Ionicons name="settings-outline" size={24} color="#B76E79" />
            <Text style={styles.optionText}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#B76E79" />
            <Text style={styles.optionText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Editar Perfil */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <TextInput style={styles.input} value={newUsername} onChangeText={setNewUsername} placeholder="Nome" />
              <TextInput style={styles.input} value={newEmail} onChangeText={setNewEmail} placeholder="E-mail" />
              <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Configurações */}
        <Modal visible={settingsVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Configurações</Text>
              <TouchableOpacity onPress={() => { setSettingsVisible(false); setModalNotificationVisible(true); }}>
                <Text style={styles.settingOption}>Notificações</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setSettingsVisible(false); setModalPasswordVisible(true); }}>
                <Text style={styles.settingOption}>Trocar Senha</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  Alert.alert(
                    'Excluir conta',
                    'Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Deletar',
                        style: 'destructive',
                        onPress: async () => {
                          try {
                            await deletarUsuario(usuario.id);
                            await AsyncStorage.removeItem('token');
                            logout();
                            navigation.reset({
                              index: 0,
                              routes: [{ name: 'Login' }],
                            });
                          } catch (error) {
                            Alert.alert('Erro ao deletar', error.response?.data?.message || error.message);
                          }
                        },
                      },
                    ]
                  );
                }}
              >
                <Ionicons name="trash-outline" size={24} color="#B76E79" />
                <Text style={styles.optionText}>Deletar Conta</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                <Text style={styles.cancelText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Notificações */}
        <Modal visible={modalNotificationVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Horário de Notificação</Text>
              <Text style={styles.settingDescription}>
                Marque um horário para poder consultar a Sky, sua IA estilista personalizada!
              </Text>

              <TouchableOpacity style={styles.timeButton} onPress={() => setShowPicker(true)}>
                <Ionicons name="time-outline" size={18} color="#B76E79" />
                <Text style={styles.timeText}>
                  {notificationTime.getHours().toString().padStart(2, '0')}:
                  {notificationTime.getMinutes().toString().padStart(2, '0')}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={notificationTime}
                  mode="time"
                  display="default"
                  onChange={(event, date) => {
                    setShowPicker(false);
                    if (date) setNotificationTime(date);
                  }}
                />
              )}

              <TouchableOpacity onPress={() => setModalNotificationVisible(false)}>
                <Text style={styles.cancelText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Trocar Senha */}
        <Modal visible={modalPasswordVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Alterar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Senha atual"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Nova senha"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmar nova senha"
                secureTextEntry
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalPasswordVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <BottomNavBar activeTab="Perfil" />
      </View>
    </SafeAreaView>
  );
}
