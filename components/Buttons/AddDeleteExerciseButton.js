import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  border-radius: 20px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

export default function AddDeleteExerciseButton({ onPress, text }) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}
