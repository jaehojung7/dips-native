import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import MyProgramCards from "../components/modal-components/MyProgramCards";
import WorkoutButton from "../components/Buttons/WorkoutButton";

const ME_QUERY = gql`
  query me {
    me {
      programs {
        id
        title
        description
        isPrivate
        likeCount
        templates {
          title
        }
      }
    }
  }
`;

const Container = styled.View`
  padding: 15px;
`;

const BorderLine = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.lightgray};
  margin: 30px 0;
`;

const WorkoutContainer = styled.View`
  margin-top: 20px;
  padding: 25px 20px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.darkgray};
`;

const ProgramTitle = styled.Text`
  font-size: 23px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.fontColor};
`;

const WorkoutTitle = styled.Text`
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
`;

const ProgramContainer = styled.View`
  margin-bottom: 20px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RecentProgram = styled.Text`
  font-size: 19px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  padding: 0 5px;
`;

const MoreProgram = styled.Text`
  font-weight: 700;
  color: ${(props) => props.theme.blue};
`;

const ButtonContainer = styled.View`
  /* flex-direction: row; */
  margin-top: 5px;
  justify-content: space-between;
`;

export default function Program({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WorkoutContainer>
          <ProgramTitle>3분할 홈짐 프로그램</ProgramTitle>
          <WorkoutTitle>이전 워크아웃: Back Shoulder Workout</WorkoutTitle>
          <WorkoutTitle>다음 워크아웃: Chest Arm Workout</WorkoutTitle>

          <ButtonContainer>
            <WorkoutButton text="다음 워크아웃 시작" onPress={() => {}} />
            <WorkoutButton
              text="새 템플릿으로 시작"
              onPress={() => navigation.navigate("CreateWorkout")}
            />
          </ButtonContainer>
        </WorkoutContainer>

        <BorderLine />
        <ProgramContainer>
          <TitleContainer>
            <RecentProgram>최근에 사용한 프로그램</RecentProgram>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MoreProgram>더보기</MoreProgram>
            </TouchableOpacity>
          </TitleContainer>
          <MyProgramCards
            programs={data?.me?.programs}
            onPress={() => navigation.navigate("MyProgramCard")}
          />
        </ProgramContainer>

        <MainButton
          text="새 프로그램 만들기"
          disabled={false}
          onPress={() => navigation.navigate("CreateProgram")}
        />
      </ScrollView>
    </Container>
  );
}
