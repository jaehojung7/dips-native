import React from "react";
import { View } from "react-native";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import WorkoutSetArray from "./WorkoutSetArray";
import AddDeleteWorkoutButton from "../Buttons/AddDeleteWorkoutButton";
import FormError from "../record-components/FormError";

const Container = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;

const WorkoutTitle = styled.TextInput`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px;
  font-size: 19px;
  font-weight: 600;
  border-radius: 5px;
  border: 1.5px solid
    ${(props) =>
      props.hasError ? props.theme.mainColor : props.theme.inputBackground};
`;
export default function WorkoutArray({
  control,
  setValue,
  errors,
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
          <Container key={workout.id}>
            <View style={{ marginBottom: 10 }}>
              <Controller
                name={`workouts[${workoutIndex}].title`}
                control={control}
                rules={{
                  required: "Workout title required",
                  minLength: {
                    value: 4,
                    message: "minLength error message",
                  },
                  maxLength: {
                    value: 21,
                    message: "maxLength error message",
                  },
                }}
                render={({ field: { onChange, onBlur } }) => (
                  <>
                    <WorkoutTitle
                      defaultValue={
                        defaultValues?.workouts[workoutIndex]?.title
                      }
                      placeholder="Workout title"
                      placeholderTextColor="#999999"
                      onChangeText={(text) =>
                        setValue(`workouts[${workoutIndex}].title`, text)
                      }
                      hasError={Boolean(
                        errors?.workouts?.[workoutIndex]?.title?.message
                      )}
                    />
                  </>
                )}
              />
            </View>

            {errors?.workouts ? (
              <FormError
                message={errors?.workouts[workoutIndex]?.title?.message}
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
          </Container>
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
