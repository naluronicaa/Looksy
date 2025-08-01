// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
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
import { Picker } from '@react-native-picker/picker';


import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import * as ImagePicker from 'expo-image-picker';

import { useUsuario } from '../contexts/UserContext';
import {
  atualizarUsuario,
  trocarSenha,
  deletarUsuario,
  atualizarImagemUsuario
} from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { usuario, logout, login: atualizarContexto } = useUsuario();

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

  const [selectedWeekday, setSelectedWeekday] = useState(2);

  const saveProfile = async () => {
    try {
      await atualizarUsuario(usuario.id, newUsername, newEmail);

      atualizarContexto({
        ...usuario,
        nome: newUsername,
        email: newEmail,
      });

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

  const handleTrocarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      try {
        await atualizarImagemUsuario(usuario.id, base64);
        atualizarContexto({ ...usuario, imagem_url: base64 });
        Alert.alert('Foto atualizada com sucesso!');
      } catch (err) {
        Alert.alert('Erro ao atualizar imagem', err.response?.data?.message || err.message);
      }
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

  const agendarNotificacaoSemanal = async (diaSemana, hora, minuto) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir notificações para usar este recurso.');
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Looksy ✨',
        body: 'Oiee, a Sky ta te chamando para planejarmos seus looks da semana!',
      },
      trigger: {
        weekday: diaSemana,
        hour: hora,
        minute: minuto,
        repeats: true,
      },
    });

    Alert.alert('Notificação agendada!', `Toda ${diasSemanaTexto[diaSemana]} às ${hora}:${String(minuto).padStart(2, '0')}`);
  };

  const diasSemanaTexto = {
    1: 'Domingo',
    2: 'Segunda-feira',
    3: 'Terça-feira',
    4: 'Quarta-feira',
    5: 'Quinta-feira',
    6: 'Sexta-feira',
    7: 'Sábado',
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={
                usuario?.imagem_url
                  ? { uri: usuario.imagem_url }
                  : require('../../assets/placeholders/profile-placeholder.jpg')
              }
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton} onPress={handleTrocarImagem}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.username}>{usuario?.nome}</Text>
          <Text style={styles.email}>{usuario?.email}</Text>
        </View>


        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem} onPress={() => setModalVisible(true)}>
            <Ionicons name="pencil-outline" size={24} color="#966D46" />
            <Text style={styles.optionText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Looks')}>
            <Ionicons name="shirt-outline" size={24} color="#966D46" />
            <Text style={styles.optionText}>Meus Looks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="diamond-outline" size={24} color="#966D46" />
            <Text style={styles.optionText}>Looksy+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Form')}>
            <Ionicons name="document-text-outline" size={24} color="#966D46" />
            <Text style={styles.optionText}>Questionário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Persona')}>
            <Ionicons name="document-text-outline" size={24} color="#966D46" />
            <Text style={styles.optionText}>Meu Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => setSettingsVisible(true)}>
            <Ionicons name="settings-outline" size={24} color="#966D46" />
            <Text style={styles.optionText}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#966D46" />
            <Text style={styles.optionText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Editar Perfil */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <Text style={styles.optionText}>Nome</Text>
              <TextInput style={styles.input} value={newUsername} onChangeText={setNewUsername} placeholder="Nome" />
              <Text style={styles.optionText}>E-mail</Text>
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
                <Ionicons name="trash-outline" size={24} color="#966D46" />
                <Text style={styles.optionText}>Deletar Conta</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                <Text style={styles.cancelText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Notificações */}
        {/* Modal Notificações */}
        <Modal visible={modalNotificationVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Horário de Notificação</Text>
              <Text style={styles.settingDescription}>
                Marque um horário e dia da semana para a Sky te lembrar de montar seus looks!
              </Text>

              {/* Seletor de horário */}
              <TouchableOpacity style={styles.timeButton} onPress={() => setShowPicker(true)}>
                <Ionicons name="time-outline" size={18} color="#966D46" />
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

              {/* Picker de dia da semana */}
              <Text style={[styles.settingDescription, { marginTop: 10 }]}>Escolha o dia da semana:</Text>
              <Picker
                selectedValue={selectedWeekday}
                onValueChange={(itemValue) => setSelectedWeekday(itemValue)}
                style={{ width: '100%' }}
              >
                <Picker.Item label="Domingo" value={1} />
                <Picker.Item label="Segunda-feira" value={2} />
                <Picker.Item label="Terça-feira" value={3} />
                <Picker.Item label="Quarta-feira" value={4} />
                <Picker.Item label="Quinta-feira" value={5} />
                <Picker.Item label="Sexta-feira" value={6} />
                <Picker.Item label="Sábado" value={7} />
              </Picker>

              {/* Botão para agendar */}
              <TouchableOpacity
                style={[styles.saveButton, { marginTop: 10 }]}
                onPress={() =>
                  agendarNotificacaoSemanal(
                    selectedWeekday,
                    notificationTime.getHours(),
                    notificationTime.getMinutes()
                  )
                }
              >
                <Text style={styles.buttonText}>Agendar Notificação</Text>
              </TouchableOpacity>

              {/* Fechar */}
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
