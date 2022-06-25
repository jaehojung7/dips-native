import React from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;

export const AuthInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  border: 1.5px solid
    ${(props) => (props.hasError ? props.theme.mainColor : props.theme.gray)};
  padding: 13px 15px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 7px;
  margin-bottom: 8px;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export default function AuthLayout({ children }) {
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "100%",
          }}
          behavior="position"
          keyboardVerticalOffset={15}
        >
          {/* <Logo
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          /> */}
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}
