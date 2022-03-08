import React from "react";
import styled from "styled-components/native";

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

function Exercise({ exercise, onDelete }) {
  return (
    <>
      <ExerciseTitleContainer>
        <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
        <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
        <DeleteButton onPress={() => onDelete(exercise.id)}>
          <DeleteText>Delete</DeleteText>
        </DeleteButton>
      </ExerciseTitleContainer>
      <BorderLine />
    </>
  );
}

export default function ExerciseList({ exercises, onDelete }) {
  return (
    <ExerciseContainer>
      {exercises.map((exercise) => (
        <Exercise exercise={exercise} key={exercise.id} onDelete={onDelete} />
      ))}
    </ExerciseContainer>
  );
}
