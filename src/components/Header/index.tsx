import React from 'react';

import {
  Container,
  TitleContainer,
  Title,
  SubTitle,
  LogoutButton,
  LogoutButtonText,
} from './styles';

const Header: React.FC = () => {
  const user = 'Solanea';
  const amountMonth = 498;

  return (
    <Container>
      <TitleContainer>
        <Title>
          Olá&nbsp;
          {user}
        </Title>
        <SubTitle>
          {amountMonth}
          &nbsp; árvores salvas esse mês
        </SubTitle>
      </TitleContainer>
      <LogoutButton>
        <LogoutButtonText>Sair</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default Header;
