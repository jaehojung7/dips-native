import React from "react";
import styled from "styled-components/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { gql, useMutation } from "@apollo/client";

const DELETE_EXERCISE_MUTATION = gql`
  mutation deleteExercise($id: Int!) {
    deleteExercise(id: $id) {
      ok
      error
    }
  }
`;

const ExerciseContainer = styled.View``;

const ExerciseTitleContainer = styled.View`
  margin: 7px 10px;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  /* margin: 10px 5px; */
  font-weight: 600;
`;

const ExerciseBodypart = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.gray};
  /* opacity: 0.5 */
  margin-top: 3px;
  /* font-weight: 600; */
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 0 10px;
  justify-content: center;
  background-color: tomato;
`;

const DeleteText = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

function Exercise({ exercise }) {
  const [deleteExerciseFunction] = useMutation(DELETE_EXERCISE_MUTATION);

  // Apollo cache 이용해서 프론트엔드에서도 실시간으로 지우기

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <DeleteButton
        onPress={() =>
          deleteExerciseFunction({ variables: { id: exercise.id } })
        }
      >
        {/* onPress 실행 직전 경고 */}
        <DeleteText>Delete</DeleteText>
      </DeleteButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <ExerciseTitleContainer>
        <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
        <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
      </ExerciseTitleContainer>
      <BorderLine />
    </Swipeable>
  );
}

export default function ExerciseList({ exercises }) {
  return (
    <ExerciseContainer>
      {exercises.map((exercise) => (
        <Exercise exercise={exercise} key={exercise.id} />
      ))}
    </ExerciseContainer>
  );
}
