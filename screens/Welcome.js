import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import MainButton from "../components/Buttons/MainButton";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

const HeaderContainer = styled.View`
  margin: 25px 0;
  align-items: center;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 45px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const Subtitle = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 20px;
  font-weight: 600;
`;

const LoginLink = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.mainColor};
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
      <HeaderContainer>
        <Header>Dips</Header>
        <Subtitle>Squat, dip, lift your workout</Subtitle>
      </HeaderContainer>
      <MainButton text="Log in" disabled={false} onPress={goToLogIn} />
      <MainButton text="Start workout" disabled={false} onPress={goToWorkout} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <LoginLink>Create an account</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
