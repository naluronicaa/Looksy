import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUsuario } from '../contexts/UserContext';
import { atualizarPerfil } from '../services/userService';
import styles from '../styles/form-styles';

import { Alert } from 'react-native';

// Mapeamento das imagens para cada etapa
const stepImages = {
  'inicio': require('../../assets/forms/Better.jpg'),
  'idade': require('../../assets/forms/q1.jpg'),
  'sexo': require('../../assets/forms/q5.jpg'),
  'biotipo': require('../../assets/forms/q6.jpg'),
  'review': require('../../assets/forms/q4.jpg'),
};

const sexos = [
  { label: 'Feminino', value: 'feminino' },
  { label: 'Masculino', value: 'masculino' },
  { label: 'Não Binário', value: 'nao_binario' }
];

const biotipos = [
  { label: 'Magro(a)', value: 'magro' },
  { label: 'Médio(a)', value: 'médio' },
  { label: 'Gordinho(a)', value: 'gordinho' }
];

export default function FormScreen() {
  const navigation = useNavigation();
  const { usuario } = useUsuario();

  // -3 = tela inicial, -2 = idade, -1 = sexo, 0 = biotipo, 1 = review
  const [step, setStep] = useState(-3);
  const [answers, setAnswers] = useState({
    idade: usuario?.idade ? String(usuario.idade) : '',
    sexo: usuario?.sexo || '',
    biotipo: usuario?.biotipo || ''
  });

  const handleContinue = async () => {
  Keyboard.dismiss();
  if (step < 1) {
    setStep(step + 1);
  } else {
    try {
      await atualizarPerfil(usuario.id, {
        idade: answers.idade,
        sexo: answers.sexo,
        biotipo: answers.biotipo
      });

      Alert.alert(
        'Perfil atualizado!',
        'Seus dados foram salvos com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
          }
        ]
      );
    } catch (err) {
      Alert.alert(
        'Erro ao salvar',
        err?.response?.data?.message || err?.message || 'Erro desconhecido'
      );
    }
  }
};


  const handleBack = () => {
    if (step === -3) {
      setStep(-3);
    } else {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const handleInput = (text) => {
    if (step === -2) {
      setAnswers({ ...answers, idade: text.replace(/[^0-9]/g, '') });
    }
  };

  // Escolhe a imagem do passo atual
  let currentImage = null;
  if (step === -3) currentImage = stepImages['inicio'];
  else if (step === -2) currentImage = stepImages['idade'];
  else if (step === -1) currentImage = stepImages['sexo'];
  else if (step === 0) currentImage = stepImages['biotipo'];
  else if (step === 1) currentImage = stepImages['review'];

  // Tela de confirmação/review
  if (step === 1) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          {currentImage && (
            <Image source={currentImage} style={styles.questionImage} resizeMode="contain" />
          )}
          <Text style={styles.title}>Confirme seus dados</Text>
          <View style={{ marginVertical: 16 }}>
            <Text style={styles.reviewLabel}>
              Idade: <Text style={styles.reviewValue}>{answers.idade}</Text>
            </Text>
            <Text style={styles.reviewLabel}>
              Sexo: <Text style={styles.reviewValue}>{sexos.find(s => s.value === answers.sexo)?.label}</Text>
            </Text>
            <Text style={styles.reviewLabel}>
              Biotipo: <Text style={styles.reviewValue}>{biotipos.find(b => b.value === answers.biotipo)?.label}</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBack} style={styles.skipBtn}>
            <Ionicons name="arrow-back" size={18} color="#966D46" />
            <Text style={styles.skipText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {currentImage && (
          <Image source={currentImage} style={styles.questionImage} resizeMode="contain" />
        )}

        {step === -3 ? (
          <>
            <Text style={styles.title}>Vamos conhecer mais sobre você agora!</Text>
            <Text style={styles.subtitle}>
              Preencha seus dados para uma experiência personalizada ✨
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => setStep(-2)}>
              <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
              <Ionicons name="arrow-back" size={18} color="#966D46" />
              <Text style={styles.skipText}>Responder depois</Text>
            </TouchableOpacity>
          </>
        ) : step === -2 ? (
          <>
            <Text style={styles.title}>Quantos anos você tem?</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua idade"
              placeholderTextColor="#966D46"
              keyboardType="number-pad"
              value={answers.idade}
              onChangeText={handleInput}
              maxLength={3}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setStep(-1)}
              disabled={!answers.idade}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
              <Ionicons name="arrow-back" size={18} color="#966D46" />
              <Text style={styles.skipText}>Responder depois</Text>
            </TouchableOpacity>
          </>
        ) : step === -1 ? (
          <>
            <Text style={styles.title}>Qual seu sexo?</Text>
            <View style={styles.chipContainer}>
              {sexos.map((sexo) => (
                <TouchableOpacity
                  key={sexo.value}
                  style={[
                    styles.chip,
                    answers.sexo === sexo.value && styles.chipSelected
                  ]}
                  onPress={() => setAnswers({ ...answers, sexo: sexo.value })}
                >
                  <Text style={[
                    styles.chipText,
                    answers.sexo === sexo.value && styles.chipTextSelected
                  ]}>
                    {sexo.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setStep(0)}
              disabled={!answers.sexo}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBack} style={styles.skipBtn}>
              <Ionicons name="arrow-back" size={18} color="#966D46" />
              <Text style={styles.skipText}>Voltar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Qual seu biotipo?</Text>
            <View style={styles.chipContainer}>
              {biotipos.map((bio) => (
                <TouchableOpacity
                  key={bio.value}
                  style={[
                    styles.chip,
                    answers.biotipo === bio.value && styles.chipSelected
                  ]}
                  onPress={() => setAnswers({ ...answers, biotipo: bio.value })}
                >
                  <Text style={[
                    styles.chipText,
                    answers.biotipo === bio.value && styles.chipTextSelected
                  ]}>
                    {bio.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setStep(1)}
              disabled={!answers.biotipo}
            >
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBack} style={styles.skipBtn}>
              <Ionicons name="arrow-back" size={18} color="#966D46" />
              <Text style={styles.skipText}>Voltar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
