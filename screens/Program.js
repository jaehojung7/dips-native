import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { TouchableOpacity, Switch } from "react-native";
import ProgramCards from "../components/ProgramCards";

export const ME_QUERY = gql`
  query me {
    me {
      id
      programs {
        id
        title
        isLiked
        isMine
        isPrivate
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
        isLiked
        isMine
        isPrivate
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
    }
  }
`;

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 20px 15px 15px 15px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

const WorkoutContainer = styled.TouchableOpacity`
  padding: 25px 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
`;

const RecentProgram = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecentTitle = styled.Text`
  font-size: 19px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 10px;
`;

const ProgramTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${(props) => props.theme.mainColor};
`;

const WorkoutTitle = styled.Text`
  margin-bottom: 10px;
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

const LikedProgram = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  padding: 0 5px;
`;

const MoreProgram = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
`;

const ButtonContainer = styled.View`
  margin: 15px 0;
  justify-content: space-between;
`;

export default function Program({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);

  if (loading)
    return (
      <IndicatorContainer>
        <ActivityIndicator />
      </IndicatorContainer>
    );
  const programs = data?.me.programs;
  const exercises = data?.me.exercises;
  const recentProgram = data?.me.recentProgram;
  const recentWorkoutIndex = data?.me.recentWorkoutIndex;
  let nextWorkoutIndex = 0;
  if (recentWorkoutIndex < recentProgram?.workouts.length - 1) {
    nextWorkoutIndex = recentWorkoutIndex + 1;
  } else {
    nextWorkoutIndex = 0;
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderContainer>
        <Header>Program</Header>
      </HeaderContainer>
      <WorkoutContainer
        onPress={() => {
          recentProgram
            ? navigation.navigate("SeeProgram", { program: recentProgram })
            : navigation.navigate("CreateProgram", { exercises });
        }}
      >
        <RecentProgram>
          <RecentTitle>Recent Program</RecentTitle>
        </RecentProgram>

        <ProgramTitle>
          {recentProgram ? recentProgram?.title : "없음"}{" "}
        </ProgramTitle>
        {recentProgram ? (
          <>
            <WorkoutTitle>
              Prev Workout: {recentProgram?.workouts[recentWorkoutIndex].title}
            </WorkoutTitle>
            <WorkoutTitle>
              Next Workout: {recentProgram?.workouts[nextWorkoutIndex].title}
            </WorkoutTitle>
          </>
        ) : (
          <WorkoutTitle></WorkoutTitle>
        )}
      </WorkoutContainer>
      <ButtonContainer>
        <MainButton
          text="Start a workout"
          onPress={() => navigation.navigate("CreateRecord", { exercises })}
        />
      </ButtonContainer>
      <ProgramContainer>
        <TitleContainer>
          <LikedProgram>Liked Program</LikedProgram>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProgramList", { programs })}
          >
            <MoreProgram>More</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <ProgramCards programs={data?.me.programs} exercises={exercises} />
      </ProgramContainer>

      <MainButton
        text="Create a program"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram", { exercises })}
      />
    </Container>
  );
}
