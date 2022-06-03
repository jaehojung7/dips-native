import React, { useRef } from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { gql, useMutation } from "@apollo/client";

const ExerciseTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 15px;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
`;

const ExerciseBodypart = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.gray};
  margin-top: 3px;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function SelectExercise({ exercise }) {
  const swipeableRef = useRef(null);

  const deleteExerciseUpdate = (cache, result) => {
    const {
      data: {
        deleteExercise: { ok, error },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Exercise:${exercise.id}` });
    }
  };

  const combinedFunctions = () => {
    deleteExerciseFunction();
    closeSwipeable();
  };
  const onClickSelect = () => {
    Alert.alert("이 운동을 삭제할까요?", "", [
      {
        text: "Delete",
        onPress: () => combinedFunctions(),
        style: "destructive",
      },
      {
        text: "Cancel",
        onPress: () => closeSwipeable(),
        style: "cancel",
      },
    ]);
  };

  return (
    <>
      <ExerciseTitleContainer>
        <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
        <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
      </ExerciseTitleContainer>
      <BorderLine />
    </>
  );
}
