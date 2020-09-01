import React from 'react';
// eslint-disable-next-line no-unused-vars
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  variant: 'filled' | 'outlined';
  color?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  color = '#34885E',
  textColor = 'white',
  children,
  ...rest
}) => {
  return (
    <Container variant={variant} color={color} {...rest}>
      <ButtonText variant={variant} color={textColor}>
        {children}
      </ButtonText>
    </Container>
  );
};

export default Button;
