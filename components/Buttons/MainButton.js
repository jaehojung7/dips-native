import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.mainColor};
  padding: 14px;
  border-radius: 20px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin: 7px 0;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.buttonText};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

export default function MainButton({ onPress, disabled, text, loading }) {
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
