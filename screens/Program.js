import React from "react";
import styled from "styled-components/native";
import MainButton from "../components/MainButton";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function Program({ navigation }) {
  const goToCreateProgram = () => navigation.navigate("CreateProgram");

  return (
    <Container>
      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={goToCreateProgram}
      />
    </Container>
  );
}
