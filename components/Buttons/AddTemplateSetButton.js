import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  padding: 5px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #42a5f5;
  font-size: 14px;
  font-weight: 700;
  margin: 0 5px;
  /* text-align: center; */
`;

export default function AddExerciseButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <TextContainer>
        <FontAwesome5 name="plus" size={14} color="#42a5f5" />
        <ButtonText>운동 추가</ButtonText>
      </TextContainer>
    </Button>
  );
}
