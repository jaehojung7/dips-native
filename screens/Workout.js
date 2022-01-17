import React from "react";
import styled from "styled-components/native";
import MainButton from "../components/MainButton";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  margin-top: 15px;
`;

export default function Workout({ navigation }) {
  return (
    <Container>
      <MainButton
        text="다음 워크아웃 시작"
        // loading={loading}
        // disabled={!watch("programTitle")}
        onPress={() => {}}
      />
      <MainButton
        text="빈 템플릿으로 시작"
        // loading={loading}
        // disabled={!watch("programTitle")}
        onPress={() => {}}
      />
    </Container>
  );
}
