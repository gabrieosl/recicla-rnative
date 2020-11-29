import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';

import backgroundImage from '../../assets/images/splash.png';

import {
  Container,
  Background,
  WelcomeBox,
  Title,
  Title2,
  SubTitle,
  SubTitle2,
} from './styles';

const Intro: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Background source={backgroundImage} />
      <WelcomeBox>
        <Title>Olá !</Title>
        <Title2>Bem-vindos ao aplicativo Recicla</Title2>
        <SubTitle>
          Aqui você calcula o papel que você recicla e quanto você contribui
          para nosso planeta em crédito de carbono*.
        </SubTitle>
        <SubTitle>
          *Crédito de carbono representa a não emissão de dióxido de carbono à
          atmosfera . Ou seja, você não estará poluindo e nem explorando o meio
          ambiente.
        </SubTitle>
        <SubTitle2>
          + árvores
          <span role="img">🌲</span>
        </SubTitle2>
        <SubTitle2>
          + oxigênio
          <span role="img">💨</span>
        </SubTitle2>
        <SubTitle2>
          + vida
          <span role="img">✨</span>
        </SubTitle2>
        <Button
          variant="filled"
          color="white"
          textColor="#34885E"
          onPress={() => navigation.navigate('Welcome')}
        >
          Continuar
        </Button>
      </WelcomeBox>
    </Container>
  );
};

export default Intro;
