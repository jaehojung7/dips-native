import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { LayoutAnimation, View } from "react-native";
import { MainContainer } from "../layouts/MainContainer";
import { ExerciseTitle, SelectExercise } from "../layouts/ArrayLayout";
import ExerciseSetArray from "./ExerciseSetArray";
import TextButton from "../Buttons/TextButton";

export default function ExerciseArray({
  control,
  setValue,
  errors,
  defaultValues,
  setRecordExerciseIndexState,
  setModalVisible,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recordExercises",
  });

  const [expanded, setExpanded] = useState(
    Array(defaultValues.recordExercises.length).fill([true])
  );

  // https://www.codingdeft.com/posts/react-usestate-array/
  // https://stackoverflow.com/questions/37601282/javascript-array-splice-vs-slice#:~:text=Splice%20and%20Slice%20both%20are%20Javascript%20Array%20functions.&text=The%20splice()%20method%20returns,t%20change%20the%20original%20array.
  const handleClick = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((arr) => [...arr.slice(0, id), !arr[id], ...arr.slice(id + 1)]);
  };

  return (
    <>
      {fields.map((recordExercise, recordExerciseIndex) => {
        return (
          <MainContainer key={recordExercise.id}>
            <Controller
              name={`recordExercises[${recordExerciseIndex}].exercise`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <SelectExercise
                  onPress={() => {
                    setRecordExerciseIndexState(recordExerciseIndex);
                    setModalVisible(true);
                  }}
                  hasError={Boolean(
                    errors?.recordExercises?.[recordExerciseIndex]?.exercise
                  )}
                >
                  <ExerciseTitle>
                    {value ? value : "Select Exercise"}
                  </ExerciseTitle>
                </SelectExercise>
              )}
            />
            <ExerciseSetArray
              recordExerciseIndex={recordExerciseIndex}
              {...{ control, setValue, errors, defaultValues }}
            />
          </MainContainer>
        );
      })}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 10,
        }}
      >
        <TextButton
          text="Add exercise"
          onPress={() => {
            append({});
            setExpanded((arr) => [...arr, true]);
          }}
        />
        <TextButton
          text="Delete exercise"
          onPress={() => {
            remove(fields.length - 1);
            setExpanded((arr) => arr.slice(0, -1));
          }}
        />
      </View>
    </>
  );
}
