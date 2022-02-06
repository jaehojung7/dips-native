import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: tomato
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export default function CloseTemplateButton({ onPress, text }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
