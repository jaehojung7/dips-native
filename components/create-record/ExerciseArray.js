import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { LayoutAnimation } from "react-native";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";
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

const SelectExercise = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  width: 85%;
`;

const ExerciseTitle = styled.Text`
  color: black;
  font-size: 15px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 7px 0;
`;

export default function ExerciseArray({
  control,
  setValue,
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
            <TitleContainer>
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
                  >
                    <ExerciseTitle>{value ? value : "운동 선택"}</ExerciseTitle>
                  </SelectExercise>
                )}
              />
            </TitleContainer>
            <ExerciseSetArray
              recordExerciseIndex={recordExerciseIndex}
              {...{ control, setValue, defaultValues }}
            />
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
