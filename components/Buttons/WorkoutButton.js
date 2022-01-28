import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  border: 1px solid ${(props) => props.theme.blue};
  padding: 10px;
  border-radius: 15px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export default function WorkoutButton({ onPress, disabled, text, loading }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
