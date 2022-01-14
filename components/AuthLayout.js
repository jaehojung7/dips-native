import React from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
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
          keyboardVerticalOffset={75}
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
