import React, { useState, useMemo, useCallback, useEffect } from 'react';
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

interface AmountInputProps extends TextInputProps {
  updateValue(newValue: string, valueType: 'count' | 'weight'): void;
}
const AmountInput: React.FC<AmountInputProps> = ({
  value = '0',
  updateValue,
  ...rest
}) => {
  const [inputType, setInputType] = useState<'count' | 'weight'>('count');
  const [inputValue, setInputValue] = useState('0');
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = useMemo(() => !!+value, [value]);
  const parsedInputTypeText = useMemo(
    () => (inputType === 'count' ? 'folhas A4' : 'g'),
    [inputType],
  );

  const handleIncrement = useCallback(() => {
    setInputValue(String(+inputValue + 1));
  }, [inputValue]);

  const handleDecrement = useCallback(() => {
    if (+inputValue) setInputValue(String(+inputValue - 1));
  }, [inputValue]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    updateValue(inputValue, inputType);
  }, [inputValue, inputType, updateValue]);

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
            value={inputValue}
            onChangeText={setInputValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            keyboardType="decimal-pad"
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
