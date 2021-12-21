import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/AuthButton";
import AuthLayout from "../components/AuthLayout";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoginLink = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  const goToWorkout = () => navigation.navigate("Workout");

  return (
    <Container>
      <AuthButton text="로그인" disabled={false} onPress={goToLogIn} />
      <AuthButton text="운동하기" disabled={false} onPress={goToWorkout} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <LoginLink>가입하기</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
