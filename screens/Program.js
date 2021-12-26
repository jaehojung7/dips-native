import React from "react";
import styled from "styled-components/native";
import MainButton from "../components/MainButton";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function Program() {
  const navigation = useNavigation();

  return (
    <Container>
      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram")}
      />
    </Container>
  );
}
