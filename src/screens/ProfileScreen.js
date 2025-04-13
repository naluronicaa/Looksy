import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Switch,
} from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/profile-styles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [modalNotificationVisible, setModalNotificationVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const [username, setUsername] = useState('Nome do Usuário');
  const [email, setEmail] = useState('usuario@email.com');
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const [notificationTime, setNotificationTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const saveProfile = () => {
    setUsername(newUsername);
    setEmail(newEmail);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image source={require('../../assets/profile-placeholder.jpg')} style={styles.profileImage} />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
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

          <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Login')}>
            <Ionicons name="log-out-outline" size={24} color="#B76E79" />
            <Text style={styles.optionText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Editar Perfil */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <TextInput
                style={styles.input}
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder="Nome"
              />
              <TextInput
                style={styles.input}
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="E-mail"
              />
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
              <TextInput style={styles.input} placeholder="Senha atual" secureTextEntry />
              <TextInput style={styles.input} placeholder="Nova senha" secureTextEntry />
              <TextInput style={styles.input} placeholder="Confirmar nova senha" secureTextEntry />
              <TouchableOpacity style={styles.saveButton} onPress={() => {
                alert('Senha alterada com sucesso!');
                setModalPasswordVisible(false);
              }}>
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
