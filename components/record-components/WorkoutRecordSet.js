import { React, useState } from "react";
import styled from "styled-components/native";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0 15px 0;
`;

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  padding: 0 5px;
`;

const RecordSetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export default function WorkoutRecordSet({ recordExerciseSets }) {
  return (
    <>
      <IndexContainer>
        <IndexText>Set</IndexText>
        <IndexText>Weight</IndexText>
        <IndexText>Reps</IndexText>
      </IndexContainer>
      {/* <BorderLine /> */}

      {recordExerciseSets.map((recordExerciseSet, recordExerciseSetIndex) => {
        return (
          <RecordSetContainer key={recordExerciseSetIndex}>
            <IndexText>
              {recordExerciseSet.recordExerciseSetIndex + 1}
            </IndexText>
            <IndexText>{recordExerciseSet.weight}</IndexText>
            <IndexText>{recordExerciseSet.repCount}</IndexText>
          </RecordSetContainer>
        );
      })}
    </>
  );
}
