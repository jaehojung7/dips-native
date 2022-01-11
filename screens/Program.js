import React from "react";
import MainButton from "../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";
import MyProgramList from "./MyProgramList";
import styled from "styled-components/native";
import FavProgramList from "./FavProgramList";

const MyProgram = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin: 5px 0;
  color: ${(props) => props.theme.orange};
`;

export default function Program() {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <MyProgram>내 운동 프로그램</MyProgram>
      <MyProgramList />
      <MyProgram>좋아하는 프로그램</MyProgram>
      <FavProgramList />
      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram")}
      />
      <MainButton
        text="프로그램 찾기"
        disabled={false}
        onPress={() => navigation.navigate("SearchPrograms")}
      />
    </ScreenLayout>
  );
}
