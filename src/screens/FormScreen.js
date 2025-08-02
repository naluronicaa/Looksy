import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUsuario } from '../contexts/UserContext';
import { salvarOuAtualizarQuestionario } from '../services/questionsService';
import styles from '../styles/form-styles';

const questionImages = {
  '1': require('../../assets/forms/q1.jpg'),
  '2': require('../../assets/forms/q2.jpg'),
  '3': require('../../assets/forms/q3.jpg'),
  '4': require('../../assets/forms/q4.jpg'),
  '5': require('../../assets/forms/q5.jpg'),
  '6': require('../../assets/forms/q6.jpg'),
  '7': require('../../assets/forms/q7.jpg'),
  '8': require('../../assets/forms/q8.jpg'),
  '9': require('../../assets/forms/q9.jpg'),
  '10': require('../../assets/forms/q10.jpg'),
};

const questions = [
  { id: '1', label: 'Qual seu estilo predominante?', placeholder: 'Ex: casual, formal, despojado...' },
  { id: '2', label: 'Quais ocasiões você mais frequenta?', placeholder: 'Ex: faculdade, trabalho, festas' },
  { id: '3', label: 'Como é o clima onde você mora?', placeholder: 'Ex: quente, chuvoso, frio...' },
  { id: '4', label: 'Você prefere conforto ou elegância?', placeholder: 'Ex: conforto' },
  { id: '5', label: 'Tem alguma cor que você ama ou evita?', placeholder: 'Ex: amo preto, evito amarelo' },
  { id: '6', label: 'Qual parte do corpo você mais gosta de valorizar?', placeholder: 'Ex: cintura, pernas, ombros...' },
  { id: '7', label: 'Qual parte do corpo você prefere disfarçar?', placeholder: 'Ex: quadril, barriga...' },
  { id: '8', label: 'Tem alguma peça que você não usaria de jeito nenhum?', placeholder: 'Ex: salto alto, cropped...' },
  { id: '9', label: 'Tem alguma peça que você ama e sempre usa?', placeholder: 'Ex: blazer, calça jeans...' },
  { id: '10', label: 'Tem alguma referência de estilo que você ama?', placeholder: 'Ex: Pinterest, influenciadores...' }
];

export default function FormScreen() {
  const navigation = useNavigation();
  const { usuario } = useUsuario();

  const [step, setStep] = useState(-1); // -1 = tela inicial
  const [answers, setAnswers] = useState({});

  const handleContinue = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      try {
        const respostasConvertidas = {};
        Object.keys(answers).forEach((key) => {
          respostasConvertidas[`pergunta${key}`] = answers[key];
        });

        const dadosParaAPI = {
          usuario_id: usuario.id,
          ...respostasConvertidas
        };


        await salvarOuAtualizarQuestionario(dadosParaAPI);
        Alert.alert('Sucesso!', 'Respostas salvas com sucesso!');
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } catch (err) {
        Alert.alert('Erro ao salvar formulário', err.response?.data?.message || err.message);
      }
    }
  };

  const handleBack = () => {
    if (step === 0) {
      setStep(-1);
    } else {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const handleInput = (text) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.id]: text });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {step === -1 ? (
          <>
            <Image source={require('../../assets/forms/Better.jpg')} style={styles.questionImage} />
            <Text style={styles.title}>Vamos te conhecer melhor!</Text>
            <Text style={styles.subtitle}>
              Quanto mais detalhes puder descrever, melhor a Sky (IA) poderá te ajudar!
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => setStep(0)}>
              <Text style={styles.buttonText}>Começar Questionário</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
              <Ionicons name="arrow-back" size={18} color="#966D46" />
              <Text style={styles.skipText}>Responder depois</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Persona')} style={styles.button}>
              <Ionicons name="woman-sharp" size={18} color="#966D46" />
              <Text style={styles.skipText}>Escolher meu Perfil</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image source={questionImages[questions[step].id]} style={styles.questionImage} />
            <Text style={styles.question}>{questions[step].label}</Text>
            <TextInput
              style={styles.input}
              placeholder={questions[step].placeholder}
              placeholderTextColor="#966D46"
              value={answers[questions[step].id] || ''}
              onChangeText={handleInput}
            />
            <View style={styles.actions}>
              <TouchableOpacity onPress={handleBack}>
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleContinue} style={styles.button}>
                <Text style={styles.buttonText}>
                  {step === questions.length - 1 ? 'Finalizar' : 'Continuar'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtnBottom}>
              <Ionicons name="arrow-undo" size={16} color="#966D46" />
              <Text style={styles.skipText}>Responder depois</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

