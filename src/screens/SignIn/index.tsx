import React, { useCallback, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  // eslint-disable-next-line no-unused-vars
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// eslint-disable-next-line no-unused-vars
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

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

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(data => {
    console.log(data);
  }, []);

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
              <ForgotPassword>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
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
