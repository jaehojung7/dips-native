import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { LayoutAnimation } from "react-native";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";
import ExpandSetButton from "../Buttons/ExpandSetButton";
import ExerciseSetArray from "./ExerciseSetArray";

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

export default function ExerciseArray({ control, setValue }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });
  const [expanded, setExpanded] = useState([true]);

  // https://www.codingdeft.com/posts/react-usestate-array/
  // https://stackoverflow.com/questions/37601282/javascript-array-splice-vs-slice#:~:text=Splice%20and%20Slice%20both%20are%20Javascript%20Array%20functions.&text=The%20splice()%20method%20returns,t%20change%20the%20original%20array.
  const handleClick = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((arr) => [...arr.slice(0, id), !arr[id], ...arr.slice(id + 1)]);
  };

  return (
    <>
      {fields.map((exercise, exerciseIndex) => {
        return (
          <MainContainer key={exercise.id}>
            <TitleContainer>
              <Controller
                name={`exercises[${exerciseIndex}].name`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ContainerTitle
                    placeholder="운동 선택"
                    defaultValue={exercise}
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(`exercises[${exerciseIndex}].name`, text)
                    }
                  />
                )}
              />

              <ExpandSetButton
                onPress={() => {
                  handleClick(exerciseIndex);
                }}
              />
            </TitleContainer>
            {expanded[exerciseIndex] && (
              <ExerciseSetArray
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
            setExpanded((arr) => [...arr, true]);
          }}
        />
        <AddDeleteExerciseButton
          text="운동 삭제"
          onPress={() => {
            remove(fields.length - 1);
            setExpanded((arr) => arr.slice(0, -1));
          }}
        />
      </ButtonContainer>
    </>
  );
}
