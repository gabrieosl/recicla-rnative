import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';

import backgroundImage from '../../assets/images/splash.png';

import { Container, Background, WelcomeBox, Title, SubTitle } from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Background source={backgroundImage} />
      <WelcomeBox>
        <Title>Recicla</Title>
        <SubTitle>Recicle papel e salve árvores</SubTitle>
        <Button
          variant="filled"
          color="white"
          textColor="#34885E"
          onPress={() => navigation.navigate('SignIn')}
        >
          Entrar
        </Button>
        <Button
          variant="outlined"
          color="white"
          onPress={() => navigation.navigate('SignUp')}
        >
          Cadastrar
        </Button>
      </WelcomeBox>
    </Container>
  );
};

export default SignIn;
