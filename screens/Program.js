import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import ProgramCards from "../components/modal-components/ProgramCards";
import WorkoutButton from "../components/Buttons/WorkoutButton";

const ME_QUERY = gql`
  query me {
    me {
      programs {
        id
        title
        description
        templates {
          title
          templateIndex
          createdAt
          templateSets {
            id
          }
        }
      }
    }
  }
`;

const Container = styled.ScrollView`
  padding: 10px;
  margin-top: 15px;
`;

const WorkoutContainer = styled.View`
  margin: 20px 0;
  padding: 25px 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
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
  margin: 20px 0;
  /* background-color: ${(props) => props.theme.cardColor}; */
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
  margin-top: 5px;
  justify-content: space-between;
`;

export default function Program({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  return (
    <Container showsVerticalScrollIndicator={false}>
      <WorkoutContainer>
        <ProgramTitle>3분할 홈짐 프로그램</ProgramTitle>
        <WorkoutTitle>이전 워크아웃: Back Shoulder Workout</WorkoutTitle>
        <WorkoutTitle>다음 워크아웃: Leg Core Workout</WorkoutTitle>

        <ButtonContainer>
          <WorkoutButton text="다음 워크아웃 시작" onPress={() => {}} />
          <WorkoutButton
            text="새 템플릿으로 시작"
            onPress={() => navigation.navigate("CreateWorkout")}
          />
        </ButtonContainer>
      </WorkoutContainer>

      <ProgramContainer>
        <TitleContainer>
          <RecentProgram>최근에 사용한 프로그램</RecentProgram>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MoreProgram>더보기</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <ProgramCards programs={data?.me?.programs} />
      </ProgramContainer>

      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram")}
      />
    </Container>
  );
}
