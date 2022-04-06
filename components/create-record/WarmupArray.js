import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";
import ExpandSetButton from "../Buttons/ExpandSetButton";
import WarmupSetArray from "./WarmupSetArray";

const WorkoutContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  margin: 5px 10px;
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

export default function WarmupArray({ control, setValue, getValues }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {fields.map((item, workoutIndex) => {
        return (
          <WorkoutContainer key={item.id}>
            <ExerciseTitleContainer>
              <ExerciseTitle
                placeholder="운동 이름"
                placeholderTextColor="#999999"
                onChangeText={(text) =>
                  setValue(`workouts[${workoutIndex}].name`, text)
                }
              />
              <ExpandSetButton
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setExpanded(!expanded);
                }}
              />
            </ExerciseTitleContainer>
            {expanded && (
              <WarmupSetArray
                workoutIndex={workoutIndex}
                {...{ control, setValue }}
              />
            )}
          </WorkoutContainer>
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
