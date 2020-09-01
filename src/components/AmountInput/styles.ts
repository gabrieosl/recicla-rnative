import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  background: transparent;
  margin-bottom: 8px;

  align-items: center;
  justify-content: space-around;
`;

export const InputTypeToggler = styled.View`
  flex-direction: row;
`;

interface InputTypeOptionProps {
  isActive: boolean;
}

export const InputTypeOption = styled.TouchableOpacity<InputTypeOptionProps>`
  margin: 0 5px;

  ${props =>
    props.isActive &&
    css`
      border-bottom-color: #34885e;
      border-bottom-width: 2px;
    `}
`;

export const InputTypeText = styled.Text<InputTypeOptionProps>`
  color: #173e2a;
  opacity: 0.2;
  ${props =>
    props.isActive &&
    css`
      opacity: 1;
    `}
`;

export const ValueContainer = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;

  height: 126px;
  margin: 10px;
`;

interface InputContainerProps {
  isFocused: boolean;
}
export const InputContainer = styled.View<InputContainerProps>`
  border-color: ${props => (props.isFocused ? '#34885e' : '#ccc')};
  border-width: 2px;
  border-radius: 10px;
  padding: 30px;
`;

export const ChangeValueButton = styled.TouchableWithoutFeedback`
  background: #34885e;
  width: 30px;
  height: 30px;
`;

export const TextInput = styled.TextInput`
  width: 150px;
  color: #34885e;
  font-family: 'space-mono';

  font-size: 44px;
  text-align: center;
`;

export const UnitText = styled.Text`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  font-size: 16px;
  color: #8b9f94;
`;
