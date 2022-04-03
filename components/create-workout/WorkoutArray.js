import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";
import ExpandSetButton from "../Buttons/ExpandSetButton";
import WorkoutSetArray from "./WorkoutSetArray";

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
`;

const ContainerTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 7px 0;
`;

export default function WorkoutArray({ control, setValue, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      {fields.map((item, workoutIndex) => {
        return (
          <MainContainer key={item.id}>
            <TitleContainer>
              <Controller
                name={`workouts[${workoutIndex}].name`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ContainerTitle
                    placeholder="운동 선택"
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(`workouts[${workoutIndex}].name`, text)
                    }
                  />
                )}
              />

              <ExpandSetButton
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setExpanded(!expanded);
                }}
              />
            </TitleContainer>
            {expanded && (
              <WorkoutSetArray
                workoutIndex={workoutIndex}
                {...{ control, setValue, watch }}
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
