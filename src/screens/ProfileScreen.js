// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import BottomNavBar from '../components/navigation-bar/NavBar';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/profile-styles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [username, setUsername] = useState('Nome do Usuário');
    const [email, setEmail] = useState('usuario@email.com');
    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);
  
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
            <TouchableOpacity style={styles.optionItem}>
              <Ionicons name="shirt-outline" size={24} color="#B76E79" />
              <Text style={styles.optionText}>Meus Looks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Ionicons name="wallet-outline" size={24} color="#B76E79" />
              <Text style={styles.optionText}>Meus Descontos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Ionicons name="diamond-outline" size={24} color="#B76E79" />
              <Text style={styles.optionText}>Looksy+</Text>
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
  
          <Modal visible={modalVisible} animationType="slide" transparent={true}>
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
  
          <Modal visible={settingsVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Configurações</Text>
                <Text style={styles.settingOption}>Notificações</Text>
                <Text style={styles.settingOption}>Tema</Text>
                <Text style={styles.settingOption}>Privacidade</Text>
                <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                  <Text style={styles.cancelText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
  
          <BottomNavBar activeTab="Perfil" />
        </View>
      </SafeAreaView>
    );
}
