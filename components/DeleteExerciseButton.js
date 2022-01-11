import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  padding: 0 5px;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export default function DeleteExerciseButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <MaterialIcons name="remove-circle-outline" size={16} color="tomato" />
    </Button>
  );
}
