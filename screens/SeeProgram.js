import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import StartWorkoutButton from "../components/Buttons/StartWorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 50px 15px 5px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProgramTitle = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

const InfoContainer = styled.View`
  margin: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const InfoText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  font-weight: 500;
  margin-left: 7px;
`;

const BookmarkContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UnlockContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const EditProgram = styled.TouchableOpacity`
  color: ${(props) => props.theme.fontColor};
`;

const EditText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 16px;
  font-weight: 600;
`;

const WorkoutContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 25px;
`;

const WorkoutTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const WorkoutTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  width: 70%;
`;

const ExerciseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ExerciseTitleContainer = styled.View`
  width: 70%;
`;

const SetbyRepContainer = styled.View`
  flex-direction: row;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

export default function SeeProgram({ route, navigation }) {
  const { program } = route.params;
  const { exercises } = route.params;
  // const id = program.id;

  const toggleLikeUpdate = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      // const programId = `Program:${id}`;
      cache.modify({
        id: `Program:${program.id}`,
        fields: {
          isLiked(prev) {
            return !prev;
          },
        },
      });
    }
  };

  const [toggleLikeFunction] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id: program.id,
    },
    update: toggleLikeUpdate,
  });

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <EditProgram
            onPress={() =>
              navigation.navigate("EditProgram", { program, exercises })
            }
          >
            <EditText>Edit</EditText>
          </EditProgram>
        </HeaderContainer>

        <InfoContainer>
          <BookmarkContainer onPress={toggleLikeFunction}>
            {program.isLiked ? (
              <>
                <FontAwesome name="bookmark" size={15} />
                <InfoText>Marked</InfoText>
              </>
            ) : (
              <>
                <FontAwesome name="bookmark-o" size={15} />
                <InfoText>Unmarked</InfoText>
              </>
            )}
          </BookmarkContainer>
          <UnlockContainer>
            {program.isPrivate ? (
              <>
                <FontAwesome5 name="lock" size={15} />
                <InfoText>Private</InfoText>
              </>
            ) : (
              <>
                <FontAwesome5 name="unlock" size={15} />
                <InfoText>Public</InfoText>
              </>
            )}
          </UnlockContainer>
        </InfoContainer>

        {program?.workouts.map((workout, workoutIndex) => {
          return (
            <WorkoutContainer key={workoutIndex}>
              <WorkoutTitleContainer>
                <WorkoutTitle>{workout.title}</WorkoutTitle>
                <StartWorkoutButton
                  text="Start"
                  onPress={() => {
                    navigation.navigate("CreateRecord", {
                      baseProgramId: program?.id,
                      programTitle: program?.title,
                      workout,
                      exercises,
                    });
                  }}
                />
              </WorkoutTitleContainer>

              {workout?.workoutSets.map((workoutSet, workoutSetIndex) => {
                return (
                  <ExerciseContainer key={workoutSetIndex}>
                    <ExerciseTitleContainer>
                      <ExerciseTitle>{workoutSet?.exercise}</ExerciseTitle>
                    </ExerciseTitleContainer>

                    <SetbyRepContainer>
                      <ExerciseTitle>{workoutSet.setCount}</ExerciseTitle>
                      <ExerciseTitle> x </ExerciseTitle>
                      <ExerciseTitle>{workoutSet.repCount}</ExerciseTitle>
                    </SetbyRepContainer>
                  </ExerciseContainer>
                );
              })}
            </WorkoutContainer>
          );
        })}
      </Container>
    </DismissKeyboard>
  );
}
