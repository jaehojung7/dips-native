import React from "react";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import ProgramCards from "../components/ProgramCards";
import WorkoutButton from "../components/Buttons/WorkoutButton";

export const ME_QUERY = gql`
  query me {
    me {
      id
      programs {
        id
        title
        workouts {
          title
          workoutIndex
          workoutSets {
            id
            exercise
            setCount
            repCount
          }
        }
      }
      exercises {
        id
        exercise
        bodyPart
      }
      recentProgram {
        id
        title
        workouts {
          title
          workoutIndex
          workoutSets {
            id
            exercise
            setCount
            repCount
          }
        }
      }
      recentWorkoutIndex
      # records {
      #   title
      #   baseProgramId
      #   baseWorkoutIndex
      #   recordExercises {
      #     exercise
      #   }
      # }
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

  if (loading) return "";

  const exercises = data?.me.exercises;
  const recentProgram = data?.me.recentProgram;
  const recentWorkoutIndex = data?.me.recentWorkoutIndex;
  let nextWorkoutIndex = 0;
  if (recentWorkoutIndex < recentProgram.workouts.length - 1) {
    nextWorkoutIndex = recentWorkoutIndex + 1;
  } else {
    nextWorkoutIndex = 0;
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderContainer>
        <Header>워크아웃</Header>
      </HeaderContainer>
      <WorkoutContainer
      // onPress={() => navigation.navigate("SeeProgram", { program })}
      >
        <ProgramTitle>
          Recent Program: {recentProgram ? recentProgram.title : "없음"}
        </ProgramTitle>
        {recentProgram ? (
          <WorkoutTitle>
            최근 워크아웃: {recentProgram.workouts[recentWorkoutIndex].title}
            다음 워크아웃: {recentProgram.workouts[nextWorkoutIndex].title}
            <StartWorkoutButton
              text="워크아웃 시작"
              onPress={() => {
                navigation.navigate("CreateRecord", {
                  baseProgramId: recentProgram?.id,
                  programTitle: recentProgram?.title,
                  workout: recentProgram?.workouts[nextWorkoutIndex],
                  exercises,
                });
              }}
            />
          </WorkoutTitle>
        ) : (
          ""
        )}
        {recentProgram?.workouts.map((workout, workoutIndex) => {
          return (
            <WorkoutTitle key={workoutIndex}>{workout.title}</WorkoutTitle>
          );
        })}
      </WorkoutContainer>
      <ButtonContainer>
        <WorkoutButton
          text="새 템플릿으로 시작"
          onPress={() => navigation.navigate("CreateRecord", { exercises })}
        />
      </ButtonContainer>
      <ProgramContainer>
        <TitleContainer>
          <RecentProgram>내 프로그램</RecentProgram>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MoreProgram>더보기</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <ProgramCards programs={data?.me.programs} exercises={exercises} />
      </ProgramContainer>

      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram", { exercises })}
      />
    </Container>
  );
}
