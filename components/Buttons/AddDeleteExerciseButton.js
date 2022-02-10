import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  /* border: 1px solid ${(props) => props.theme.blue}; */
  border-radius: 20px;
  /* padding: 7px 15px; */
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

export default function AddDeleteExerciseButton({ onPress, text }) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}
