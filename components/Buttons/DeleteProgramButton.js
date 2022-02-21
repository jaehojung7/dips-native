import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px 25px;
  border-radius: 20px;
  background-color: tomato;
  /* margin: 10px; */
  width: 45%;
`;

const ButtonText = styled.Text`
  color: white
  font-size: 16px;
  font-weight: 600;
  margin: 0 5px;
  text-align: center;
`;

export default function EditProgramButton({ onPress, text }) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}
