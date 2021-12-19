import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.accent};
  padding: 15px 10px;
  border-radius: 10px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.buttonText};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  padding: 0px 25px;
`;

function AuthButton({ onPress, disabled, text, loading }) {
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

export default AuthButton;
