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

export default function WorkoutRecord({ recordExercises }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {recordExercises.map((recordExercise, recordExerciseIndex) => {
        return (
          <TitleContainer key={recordExerciseIndex}>
            <ContainerTitle>{recordExercise.exercise}</ContainerTitle>
            <ExpandSetButton
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                setExpanded(!expanded);
              }}
            />
          </TitleContainer>
        );
      })}

      {
        expanded &&
          recordExercises.map((recordExercise, recordExerciseIndex) => {
            return (
              <WorkoutRecordSet
                key={recordExerciseIndex}
                recordExerciseSets={recordExercise.recordExerciseSets}
              />
            );
          })
        // <WorkoutRecordSet
        //   recordExerciseSets={recordExercise.recordExerciseSets}
        // />
      }
    </>
  );
}
