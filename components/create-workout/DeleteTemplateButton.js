import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  margin-right: -5px;
`;

export default function DeleteWorkoutButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <FontAwesome name="remove" size={20} color="tomato" />
    </Button>
  );
}
