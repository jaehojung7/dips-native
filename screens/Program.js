import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import ProgramCards from "../components/ProgramCards";
import WorkoutButton from "../components/Buttons/WorkoutButton";

const ME_QUERY = gql`
  query me {
    me {
      id
      programs {
        id
        title
        workouts {
          title
          workoutSets {
            id
          }
        }
      }
    }
  }
`;

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 25px 15px 15px 15px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const WorkoutContainer = styled.TouchableOpacity`
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
  margin: 15px 0;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RecentProgram = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  padding: 0 5px;
`;

const MoreProgram = styled.Text`
  font-weight: 700;
  color: ${(props) => props.theme.blue};
`;

const ButtonContainer = styled.View`
  margin: 15px 0;
  justify-content: space-between;
`;

export default function Program({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  console.log(data);
  const program = data?.me.programs[0];
  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderContainer>
        <Header>워크아웃</Header>
      </HeaderContainer>
      <WorkoutContainer
        onPress={() => navigation.navigate("SeeProgram", { program })}
      >
        <ProgramTitle>최근에 운동한 프로그램</ProgramTitle>
        <WorkoutTitle>이전 워크아웃: Workout A</WorkoutTitle>
        <WorkoutTitle>다음 워크아웃: Workout B</WorkoutTitle>
      </WorkoutContainer>
      <ButtonContainer>
        <WorkoutButton
          text="새 템플릿으로 시작"
          onPress={() => navigation.navigate("StackWorkout", {})}
        />
      </ButtonContainer>
      <ProgramContainer>
        <TitleContainer>
          <RecentProgram>내 프로그램</RecentProgram>
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
