import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import MainButton from "../components/buttons/MainButton";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

const LoginLink = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.blue};
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  const goToWorkout = () => navigation.navigate("Workout", {});

  return (
    <Container>
      <MainButton text="로그인" disabled={false} onPress={goToLogIn} />
      <MainButton text="운동하기" disabled={false} onPress={goToWorkout} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <LoginLink>가입하기</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
