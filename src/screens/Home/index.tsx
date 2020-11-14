/* eslint-disable no-restricted-globals */
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/Auth';

import { gramsToTrees, paperToGram } from '../../utils/conversion';

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
  const [inputValueInGrams, setInputValueInGrams] = useState('0');

  const { writeNewRecycling } = useAuth();

  const handleSubmit = useCallback(async () => {
    const result = await writeNewRecycling(+inputValueInGrams);
    if (result) toast.success('Registrado com sucesso.');
    console.log(`result: ${result}`);
  }, [inputValueInGrams, writeNewRecycling]);

  const updateValue = useCallback(
    (newValue: string, valueType: 'count' | 'weight') => {
      if (isNaN(+newValue)) return;
      if (valueType === 'count') {
        setInputValueInGrams(String(paperToGram(+newValue) - 0));
      } else {
        setInputValueInGrams(String(+newValue - 0));
      }
    },
    [],
  );

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
            <AmountInput updateValue={updateValue} />
            <SubmitButton onPress={handleSubmit}>
              <SubmitText>Enviar</SubmitText>
              <SubmitCalcText>
                {`+ ${gramsToTrees(inputValueInGrams).toFixed(1)} `}
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
