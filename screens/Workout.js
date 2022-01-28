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
  padding: 0 10px;
`;

const BorderLine = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.lightgray};
  margin-top: 25px;
`;

const WorkoutContainer = styled.View`
  margin-top: 20px;
  padding: 0 5px;
  /* background-color: gray; */
`;

const WorkoutInfo = styled.View`
  /* padding: 10px 0; */
  border-radius: 15px;
`;

const ProgramTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

const WorkoutTitle = styled.Text`
  margin-top: 15px;
  font-weight: 600;
  font-size: 17px;
  color: ${(props) => props.theme.fontColor};
`;

const ProgramContainer = styled.View`
  margin-top: 25px;
  padding: 0 5px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RecentProgram = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  padding: 0 5px;
`;

const MoreProgram = styled.Text`
  font-weight: 700;
  color: ${(props) => props.theme.blue};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  /* margin-top: 15px; */
  /* padding: 0px 25px; */
  justify-content: space-between;
`;

export default function Program({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  return (
    <Container>
      <ScrollView>
        <WorkoutContainer>
          <WorkoutInfo>
            <ProgramTitle>3분할 홈짐 프로그램 </ProgramTitle>
            <WorkoutTitle>이전 워크아웃: Back Shoulder Workout</WorkoutTitle>
            <WorkoutTitle>다음 워크아웃: Chest Arm Workout</WorkoutTitle>
          </WorkoutInfo>
          <ButtonContainer>
            <WorkoutButton text="다음 워크아웃 시작" onPress={() => {}} />
            <WorkoutButton
              text="빈 템플릿으로 시작"
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
          <MyProgramCards programs={data?.me?.programs} />

          <MainButton
            text="새 프로그램 만들기"
            disabled={false}
            onPress={() => navigation.navigate("CreateProgram")}
          />
        </ProgramContainer>
      </ScrollView>
    </Container>
  );
}
