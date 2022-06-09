import { React } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import WorkoutRecordSet from "./WorkoutRecordSet";

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContainerTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

export default function WorkoutRecord({ recordExercises }) {
  return (
    <>
      {recordExercises.map((recordExercise, recordExerciseIndex) => {
        return (
          <View key={recordExercise.id}>
            <TitleContainer>
              <ContainerTitle>{recordExercise.exercise}</ContainerTitle>
            </TitleContainer>
            <WorkoutRecordSet
              recordExerciseSets={recordExercise.recordExerciseSets}
            />
          </View>
        );
      })}
    </>
  );
}
