import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #797d7f;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #797d7f;
  font-size: 14px;
  font-weight: 700;
  margin: 0 5px;
  text-align: center;
`;

export default function AddWorkoutButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <TextContainer>
        <FontAwesome5 name="plus" size={14} color="#797d7f" />
        <ButtonText>워크아웃 추가하기</ButtonText>
      </TextContainer>
    </Button>
  );
}
