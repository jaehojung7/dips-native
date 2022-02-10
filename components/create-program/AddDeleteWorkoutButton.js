import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: #999999;
  font-size: 16px;
  font-weight: 700;
  margin: 0 5px;
  text-align: center;
`;

export default function AddDeleteWorkoutButton({ onPress, text }) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}
