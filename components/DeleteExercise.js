import React, { useRef } from "react";
import { Alert, Platform } from "react-native";
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

const ExerciseTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
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

export default function DeleteExercise({ exercise }) {
  const swipeableRef = useRef(null);
  const closeSwipeable = () => {
    swipeableRef.current.close();
  };

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

  const [deleteExerciseFunction] = useMutation(DELETE_EXERCISE_MUTATION, {
    variables: {
      id: exercise.id,
    },
    update: deleteExerciseUpdate,
  });

  const combinedFunctions = () => {
    deleteExerciseFunction();
    closeSwipeable();
  };
  const onClickDelete = () => {
    Alert.alert("Delete this exercise?", "", [
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

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <DeleteButton
        onPress={Platform.OS === "web" ? deleteExerciseFunction : onClickDelete}
      >
        <DeleteText>Delete</DeleteText>
      </DeleteButton>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      <ExerciseTitleContainer>
        <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
        <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
      </ExerciseTitleContainer>
      <BorderLine />
    </Swipeable>
  );
}
