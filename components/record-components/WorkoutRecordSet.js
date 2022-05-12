import { React } from "react";
import styled from "styled-components/native";

const RecordSetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0 15px 0;
`;

const SetContainer = styled.View`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 3px;
  border-radius: 5px;
  width: 15%;
`;

const SetText = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const WeightbyReps = styled.View`
  /* border: 1px solid black; */
  /* width: 50%; */
  flex-direction: row;
  justify-content: space-evenly;
`;

const RecordText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 0 3px;
`;

export default function WorkoutRecordSet({ recordExerciseSets }) {
  return (
    <>
      {recordExerciseSets.map((recordExerciseSet, recordExerciseSetIndex) => {
        return (
          <>
            <RecordSetContainer key={recordExerciseSetIndex}>
              <SetContainer>
                <SetText>
                  {recordExerciseSet.recordExerciseSetIndex + 1}
                </SetText>
              </SetContainer>

              <WeightbyReps>
                <RecordText>{recordExerciseSet.weight} kg</RecordText>
                <RecordText>x</RecordText>
                <RecordText>{recordExerciseSet.repCount}</RecordText>
              </WeightbyReps>
            </RecordSetContainer>
          </>
        );
      })}
    </>
  );
}
