/* eslint-disable no-restricted-globals */
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useAuth } from '../../context/Auth';

import Header from '../../components/Header';
import AmountInput from '../../components/AmountInput';

import backgroundImage from '../../assets/images/splash.png';

import {
  Container,
  Title,
  SubmitButton,
  SubmitText,
  SubmitCalcText,
  Image,
} from './styles';

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState('0');

  const { writeNewRecycling } = useAuth();

  const handleSubmit = useCallback(() => {
    writeNewRecycling(+inputValue);
  }, [inputValue, writeNewRecycling]);

  const updateValue = useCallback((newValue: string) => {
    if (isNaN(+newValue)) return;
    setInputValue(String(+newValue - 0));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
          >
            <Title>Quanto papel você reciclou hoje?</Title>
            <AmountInput
              value={inputValue}
              onChangeText={updateValue}
              keyboardType="decimal-pad"
            />
            <SubmitButton onPress={handleSubmit}>
              <SubmitText>Enviar</SubmitText>
              <SubmitCalcText>
                {`+ ${inputValue} `}
                árvores salvas
              </SubmitCalcText>
            </SubmitButton>
            <Image source={backgroundImage} resizeMode="contain" />
          </KeyboardAvoidingView>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
