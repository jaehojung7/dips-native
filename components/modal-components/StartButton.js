import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  /* border-radius: 30px; */
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export default function StartButton({ onPress, text }) {
  return (
    <Button onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
