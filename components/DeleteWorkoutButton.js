import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  padding: 0 5px;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export default function DeleteWorkoutButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <FontAwesome name="remove" size={18} color="tomato" />
    </Button>
  );
}
