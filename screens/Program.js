import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import ProgramCards from "../components/ProgramCards";
import DismissKeyboard from "../components/DismissKeyboard";
import { Container } from "../components/layouts/MainContainer";

export const ME_QUERY = gql`
  query me {
    me {
      id
      programs {
        id
        title
        user {
          username
        }
        isLiked
        isMine
        isPublic
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
        isPublic
        user {
          username
        }
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
      likes {
        program {
          id
          title
          user {
            username
          }
          isLiked
          isMine
          isPublic
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
      }
    }
  }
`;

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const RecentProgramContainer = styled.TouchableOpacity`
  margin-bottom: 15px;
  padding: 25px 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
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

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FavoritePrograms = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  padding: 0 5px;
`;

const MoreProgram = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
`;

export default function Program({ navigation }) {
  const { data, loading, refetch } = useQuery(ME_QUERY);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const directStart = true;

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
  const likes = data?.me.likes.map((like) => like.program);

  DeviceEventEmitter.addListener(
    "event.deleteProgram",
    async (data) => await refetch()
  );

  DeviceEventEmitter.addListener(
    "event.toggleLike",
    async (data) => await refetch()
  );

  return (
    <DismissKeyboard>
      <Container
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <RecentProgramContainer
          onPress={() => {
            recentProgram
              ? navigation.navigate("SeeProgram", {
                  program: recentProgram,
                  exercises,
                  directStart,
                })
              : navigation.navigate("CreateProgram", { exercises });
          }}
        >
          <RecentTitle>Recent Program</RecentTitle>

          <ProgramTitle>
            {recentProgram ? recentProgram?.title : "No recent program"}{" "}
          </ProgramTitle>
          {recentProgram ? (
            <>
              <WorkoutTitle>
                Recent workout:{" "}
                {recentProgram?.workouts[recentWorkoutIndex].title}
              </WorkoutTitle>
              <WorkoutTitle>
                Next workout: {recentProgram?.workouts[nextWorkoutIndex].title}
              </WorkoutTitle>
            </>
          ) : (
            <WorkoutTitle></WorkoutTitle>
          )}
        </RecentProgramContainer>

        <MainButton
          text="Start an empty workout"
          onPress={() => navigation.navigate("CreateRecord", { exercises })}
        />

        <View style={{ marginVertical: 15 }}>
          <TitleContainer>
            <FavoritePrograms>My Programs</FavoritePrograms>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProgramList", {
                  programs,
                  exercises,
                  header: "My Programs",
                })
              }
            >
              <MoreProgram>More</MoreProgram>
            </TouchableOpacity>
          </TitleContainer>
          <ProgramCards programs={programs} exercises={exercises} />
        </View>

        <View style={{ marginVertical: 15 }}>
          <TitleContainer>
            <FavoritePrograms>Favorite Programs</FavoritePrograms>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProgramList", {
                  programs: likes,
                  exercises,
                  header: "Favorite Programs",
                })
              }
            >
              <MoreProgram>More</MoreProgram>
            </TouchableOpacity>
          </TitleContainer>
          <ProgramCards programs={likes} exercises={exercises} />
        </View>

        <MainButton
          text="Create a new program"
          disabled={false}
          onPress={() => navigation.navigate("CreateProgram", { exercises })}
        />
      </Container>
    </DismissKeyboard>
  );
}
