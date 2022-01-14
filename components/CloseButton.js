import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 30px;
  margin-top: 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  padding: 10px;
`;

export default function CloseButton({ onPress, text }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
