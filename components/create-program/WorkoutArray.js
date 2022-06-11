import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import WorkoutSetArray from "./WorkoutSetArray";
import AddDeleteWorkoutButton from "../Buttons/AddDeleteWorkoutButton";
import FormError from "../record-components/FormError";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0;
`;

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;
const TitleContainer = styled.View`
  padding: 0 5px;
`;

const ContainerTitle = styled.TextInput`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

export default function WorkoutArray({
  control,
  setValue,
  errors,
  defaultValues,
  setWorkoutIndexState,
  setWorkoutSetIndexState,
  setModalVisible,
  clearErrors,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });
  console.log(errors);
  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <>
      {fields.map((workout, workoutIndex) => {
        return (
          <MainContainer key={workout.id}>
            <TitleContainer>
              <Controller
                name={`workouts[${workoutIndex}].title`}
                control={control}
                rules={{
                  required: "workout title required",
                  minLength: {
                    value: 4,
                    message: "minLength error message",
                  },
                  maxLength: {
                    value: 25,
                    message: "maxLength error message",
                  },
                }}
                render={({ field: { onChange, onBlur, ref } }) => (
                  <>
                    <ContainerTitle
                      defaultValue={
                        defaultValues?.workouts[workoutIndex]?.title
                      }
                      placeholder="Workout title"
                      placeholderTextColor="#999999"
                      onChangeText={(text) =>
                        setValue(`workouts[${workoutIndex}].title`, text)
                      }
                      onChange={clearLoginError}
                    />
                  </>
                )}
              />
            </TitleContainer>

            <BorderLine />
            {errors?.workouts ? (
              <FormError
                message={errors?.workouts[workoutIndex]?.title.message}
              />
            ) : null}

            <WorkoutSetArray
              workoutIndex={workoutIndex}
              {...{
                control,
                setValue,
                errors,
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
        text="Add workout"
        onPress={() => {
          append({});
        }}
      />
      <AddDeleteWorkoutButton
        text="Delete workout"
        onPress={() => {
          remove(fields.length - 1);
        }}
      />
    </>
  );
}
