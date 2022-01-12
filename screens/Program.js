import React from "react";
import MainButton from "../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";
import MyProgramList from "./MyProgramList";
import styled from "styled-components/native";
import FavProgramList from "./FavProgramList";
import { ScrollView, TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  margin-top: 15px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ProgramTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin: 10px 5px 10px 5px;
  color: ${(props) => props.theme.fontColor};
`;

const MoreProgram = styled.Text`
  font-weight: 700;
  color: ${(props) => props.theme.blue};
`;

export default function Program() {
  const navigation = useNavigation();

  return (
    <Container>
      <ScrollView>
        <TitleContainer>
          <ProgramTitle>나의 운동 프로그램</ProgramTitle>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MoreProgram>더보기</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <MyProgramList />

        <TitleContainer>
          <ProgramTitle>즐겨찾는 프로그램</ProgramTitle>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MoreProgram>더보기</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <FavProgramList />

        <MainButton
          text="새 프로그램 만들기"
          disabled={false}
          onPress={() => navigation.navigate("CreateProgram")}
        />
        {/* <MainButton
        text="프로그램 찾기"
        disabled={false}
        onPress={() => navigation.navigate("SearchPrograms")}
      /> */}
      </ScrollView>
    </Container>
  );
}
