import { React, useState } from "react";
import styled from "styled-components/native";
import { LayoutAnimation } from "react-native";
import ExpandSetButton from "../Buttons/ExpandSetButton";
import WorkoutRecordSet from "./WorkoutRecordSet";

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ContainerTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const MainContainer = styled.View`
  margin-top: 3px;
`;

const TotalVolume = styled.View`
  /* border: 1px solid black; */
  /* width: 50%; */
  flex-direction: row;
  /* justify-content: space-evenly; */
`;

export default function WorkoutRecord({ recordExercises }) {
  const [expanded, setExpanded] = useState(
    Array(recordExercises.length).fill([false])
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
            {/* <TotalVolume>
              <ContainerTitle>전체 운동량</ContainerTitle>
              <ContainerTitle>
                {recordExerciseSet.weight * recordExerciseSet.repCount}
              </ContainerTitle>
            </TotalVolume> */}
          </MainContainer>
        );
      })}
    </>
  );
}
