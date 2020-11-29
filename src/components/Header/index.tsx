import React from 'react';

import { useAuth } from '../../context/Auth';

import { gramsToCarbonCredit } from '../../utils/conversion';
import {
  Container,
  TitleContainer,
  Title,
  SubTitle,
  LogoutButton,
  LogoutButtonText,
} from './styles';

const Header: React.FC = () => {
  const auth = useAuth();

  const { userName, signOut, userTotalWeightInGrams } = auth;

  return (
    <Container>
      <TitleContainer>
        <Title>
          Olá&nbsp;
          {userName}
        </Title>
        <SubTitle>
          {gramsToCarbonCredit(userTotalWeightInGrams).toFixed(1)}
          &nbsp; Créditos Carbono esse mês
        </SubTitle>
      </TitleContainer>
      <LogoutButton onPress={signOut}>
        <LogoutButtonText>Sair</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default Header;
