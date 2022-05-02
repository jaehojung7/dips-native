import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";
import ExpandSetButton from "../Buttons/ExpandSetButton";
import WarmupSetArray from "./WarmupSetArray";

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;
const ExerciseTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ExerciseTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 700;
  padding: 0 10px;
  color: ${(props) => props.theme.fontColor};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 7px 0;
`;

export default function WarmupArray({ control, setValue, workout }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });
  const [expanded, setExpanded] = useState([false]);
  const handleClick = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((arr) => [...arr.slice(0, id), !arr[id], ...arr.slice(id + 1)]);
  };

  return (
    <>
      {fields.map((exercise, exerciseIndex) => {
        return (
          <MainContainer key={exercise.id}>
            <ExerciseTitleContainer>
              <ExerciseTitle
                defaultValue={exercise.exercise}
                placeholder="운동 이름"
                placeholderTextColor="#999999"
                onChangeText={(text) =>
                  setValue(`exercises[${exerciseIndex}].name`, text)
                }
              />
              <ExpandSetButton
                onPress={() => {
                  handleClick(exerciseIndex);
                }}
              />
            </ExerciseTitleContainer>
            {expanded[exerciseIndex] && (
              <WarmupSetArray
                exerciseIndex={exerciseIndex}
                {...{ control, setValue }}
              />
            )}
          </MainContainer>
        );
      })}
      <ButtonContainer>
        <AddDeleteExerciseButton
          text="운동 추가"
          onPress={() => {
            append({});
          }}
        />
        <AddDeleteExerciseButton
          text="운동 삭제"
          onPress={() => {
            remove(fields.length - 1);
          }}
        />
      </ButtonContainer>
    </>
  );
}
