import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { View } from "react-native";
import TextButton from "../Buttons/TextButton";
import {
  ExerciseTitle,
  SelectExercise,
  ArrayContainer,
  IndexContainer,
  IndexText,
  InputCount,
} from "../layouts/ArrayLayout";

export default function WorkoutSetArray({
  workoutIndex,
  control,
  setValue,
  errors,
  defaultValues,
  setWorkoutIndexState,
  setWorkoutSetIndexState,
  setModalVisible,
}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `workouts[${workoutIndex}].workoutSets`,
  });

  return (
    <>
      <ArrayContainer>
        <IndexContainer>
          <IndexText>Exercise</IndexText>
        </IndexContainer>

        <IndexContainer>
          <IndexText>Sets</IndexText>
          <IndexText>x</IndexText>
          <IndexText>Reps</IndexText>
        </IndexContainer>
      </ArrayContainer>

      {fields.map((workoutSet, workoutSetIndex) => {
        return (
          <ArrayContainer key={workoutSet.id}>
            <IndexContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].exercise`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <SelectExercise
                    style={{ width: "100%" }}
                    onPress={() => {
                      setWorkoutIndexState(workoutIndex);
                      setWorkoutSetIndexState(workoutSetIndex);
                      setModalVisible(true);
                    }}
                    hasError={Boolean(
                      errors?.workouts?.[workoutIndex]?.workoutSets?.[
                        workoutSetIndex
                      ]?.exercise
                    )}
                  >
                    <ExerciseTitle>{value ? value : "Select"}</ExerciseTitle>
                  </SelectExercise>
                )}
              />
            </IndexContainer>

            <IndexContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].setCount`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
                    defaultValue={
                      defaultValues?.workouts[workoutIndex]?.workoutSets[
                        workoutSetIndex
                      ]?.setCount
                    }
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#7b7b7b"
                    onChangeText={(text) =>
                      setValue(
                        `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].setCount`,
                        text
                      )
                    }
                    hasError={Boolean(
                      errors?.workouts?.[workoutIndex]?.workoutSets?.[
                        workoutSetIndex
                      ]?.setCount
                    )}
                  />
                )}
              />
              <IndexText>x</IndexText>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].repCount`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
                    defaultValue={
                      defaultValues?.workouts[workoutIndex]?.workoutSets[
                        workoutSetIndex
                      ]?.repCount
                    }
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#7b7b7b"
                    onChangeText={(text) =>
                      setValue(
                        `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].repCount`,
                        text
                      )
                    }
                    hasError={Boolean(
                      errors?.workouts?.[workoutIndex]?.workoutSets?.[
                        workoutSetIndex
                      ]?.repCount
                    )}
                  />
                )}
              />
            </IndexContainer>
          </ArrayContainer>
        );
      })}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 7,
        }}
      >
        <TextButton
          text="Add exercise"
          onPress={() => {
            append({});
          }}
        />
        <TextButton
          text="Delete exercise"
          onPress={() => {
            remove(fields.length - 1);
          }}
        />
      </View>
    </>
  );
}
