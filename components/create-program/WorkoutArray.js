import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import WorkoutSetArray from "./WorkoutSetArray";
import AddDeleteWorkoutButton from "../Buttons/AddDeleteWorkoutButton";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0 15px 0;
`;

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const ContainerTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

export default function WorkoutArray({
  control,
  setValue,
  defaultValues,
  setWorkoutIndexState,
  setWorkoutSetIndexState,
  setModalVisible,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });

  return (
    <>
      {fields.map((workout, workoutIndex) => {
        return (
          <MainContainer key={workout.id}>
            <TitleContainer>
              <Controller
                name={`workouts[${workoutIndex}].title`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ContainerTitle
                    defaultValue={defaultValues?.workouts[workoutIndex]?.title}
                    placeholder="워크아웃 이름"
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(`workouts[${workoutIndex}].title`, text)
                    }
                  />
                )}
              />
            </TitleContainer>
            <BorderLine />
            <WorkoutSetArray
              workoutIndex={workoutIndex}
              {...{
                control,
                setValue,
                defaultValues,
                setWorkoutIndexState,
                setWorkoutSetIndexState,
                setModalVisible,
              }}
            />
          </MainContainer>
        );
      })}

      <AddDeleteWorkoutButton
        text="워크아웃 추가"
        onPress={() => {
          append({});
        }}
      />
      <AddDeleteWorkoutButton
        text="워크아웃 삭제"
        onPress={() => {
          remove(fields.length - 1);
        }}
      />
    </>
  );
}
