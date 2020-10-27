import React from 'react';

import { useAuth } from '../../context/Auth';
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

  const { userName, signOut } = auth;
  const amountMonth = 498;

  return (
    <Container>
      <TitleContainer>
        <Title>
          Olá&nbsp;
          {userName}
        </Title>
        <SubTitle>
          {amountMonth}
          &nbsp; árvores salvas esse mês
        </SubTitle>
      </TitleContainer>
      <LogoutButton onPress={signOut}>
        <LogoutButtonText>Sair</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default Header;
