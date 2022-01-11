import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  margin-right: -5px;
`;

export default function DeleteWorkoutButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <FontAwesome5 name="minus-square" size={20} color="tomato" />
    </Button>
  );
}
