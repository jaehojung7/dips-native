import { React, useState } from "react";
import styled from "styled-components/native";
import { LayoutAnimation } from "react-native";
import ExpandSetButton from "../Buttons/ExpandSetButton";
import WorkoutRecordSet from "./WorkoutRecordSet";

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
`;

const ContainerTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;

export default function WorkoutRecord({ recordExercises }) {
  const [expanded, setExpanded] = useState(
    Array(recordExercises.length).fill([true])
  );

  const handleClick = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((arr) => [...arr.slice(0, id), !arr[id], ...arr.slice(id + 1)]);
  };

  return (
    <>
      {recordExercises.map((recordExercise, recordExerciseIndex) => {
        return (
          <MainContainer key={recordExercise.id}>
            <TitleContainer>
              <ContainerTitle>{recordExercise.exercise}</ContainerTitle>
              <ExpandSetButton
                onPress={() => {
                  handleClick(recordExerciseIndex);
                }}
              />
            </TitleContainer>
            {expanded[recordExerciseIndex] && (
              <WorkoutRecordSet
                recordExerciseSets={recordExercise.recordExerciseSets}
              />
            )}
          </MainContainer>
        );
      })}
    </>
  );
}
