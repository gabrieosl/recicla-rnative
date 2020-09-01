import React, { useState, useMemo, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  InputTypeToggler,
  InputTypeOption,
  InputTypeText,
  ValueContainer,
  InputContainer,
  TextInput,
  ChangeValueButton,
  UnitText,
} from './styles';

const AmountInput: React.FC<TextInputProps> = ({
  value = '0',
  onChangeText,
  ...rest
}) => {
  const [inputType, setInputType] = useState<'count' | 'weight'>('count');
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = useMemo(() => !!+value, [value]);
  const parsedInputTypeText = useMemo(
    () => (inputType === 'count' ? 'folhas A4' : 'g'),
    [inputType],
  );

  const handleIncrement = useCallback(() => {
    onChangeText && onChangeText(String(+value + 1));
  }, [onChangeText, value]);

  const handleDecrement = useCallback(() => {
    if (+value && onChangeText) onChangeText(String(+value - 1));
  }, [onChangeText, value]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container>
      <InputTypeToggler>
        <InputTypeOption
          isActive={inputType === 'count'}
          onPress={() => setInputType('count')}
        >
          <InputTypeText isActive={inputType === 'count'}>
            Quantidade
          </InputTypeText>
        </InputTypeOption>
        <InputTypeOption
          isActive={inputType === 'weight'}
          onPress={() => setInputType('weight')}
        >
          <InputTypeText isActive={inputType === 'weight'}>Peso</InputTypeText>
        </InputTypeOption>
      </InputTypeToggler>
      <ValueContainer>
        <ChangeValueButton onPress={(isFilled && handleDecrement) || undefined}>
          <Feather
            color={isFilled ? '#34885e' : 'transparent'}
            name="minus"
            size={30}
          />
        </ChangeValueButton>
        <InputContainer isFocused={isFocused}>
          <TextInput
            keyboardAppearance="default"
            placeholderTextColor="#ccc"
            value={value}
            onChangeText={onChangeText}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
          />
          <UnitText>{parsedInputTypeText}</UnitText>
        </InputContainer>
        <ChangeValueButton onPress={handleIncrement}>
          <Feather color="#34885e" name="plus" size={30} />
        </ChangeValueButton>
      </ValueContainer>
    </Container>
  );
};

export default AmountInput;
