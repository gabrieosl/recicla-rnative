import React, { useCallback, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/Auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import backgroundImage from '../../assets/images/splash.png';

import {
  Container,
  Background,
  Title,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';

interface SignInData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const auth = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (data: SignInData) => {
      const { email, password } = data;
      const response = await auth.signIn(email, password);
      if (response) toast.success('Sucesso.');
      else toast.error('Algo deu errado. Tente novamente');
    },
    [auth],
  );

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Background source={backgroundImage} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              {/* <ForgotPassword>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword> */}
              <Button
                variant="filled"
                onPress={() => formRef.current?.submitForm()}
              >
                Entrar
              </Button>
            </Form>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
      <Button
        variant="outlined"
        textColor="#34885e"
        onPress={() => navigation.navigate('SignUp')}
      >
        Cadastrar
      </Button>
    </Container>
  );
};

export default SignIn;
