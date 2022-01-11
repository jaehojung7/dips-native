import React from "react";
import MainButton from "../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";
import ProgramList from "./ProgramList";
import styled from "styled-components/native";

const MyProgram = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
  color: ${(props) => props.theme.orange};
`;

export default function Program() {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram")}
      />

      <MyProgram>내 운동 프로그램</MyProgram>

      <ProgramList />
      <MainButton
        text="프로그램 찾기"
        disabled={false}
        onPress={() => navigation.navigate("SearchPrograms")}
      />
    </ScreenLayout>
  );
}
