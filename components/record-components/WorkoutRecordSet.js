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

export default function WorkoutRecordSet() {
  return (
    <>
      <IndexContainer>
        <IndexText>Set</IndexText>
        <IndexText>Weight</IndexText>
        <IndexText>Reps</IndexText>
      </IndexContainer>
      {/* <BorderLine /> */}

      <RecordSetContainer>
        <IndexText>1</IndexText>
        <IndexText>55 kg x 5</IndexText>
      </RecordSetContainer>
      <RecordSetContainer>
        <IndexText>2</IndexText>
        <IndexText>57.5 kg</IndexText>
        <IndexText>5</IndexText>
      </RecordSetContainer>
      <RecordSetContainer>
        <IndexText>3</IndexText>

        <IndexText>57.5 kg x 5</IndexText>
      </RecordSetContainer>
      <RecordSetContainer>
        <IndexText>Total Volume</IndexText>
        <IndexText>825 kg</IndexText>
      </RecordSetContainer>
    </>
  );
}
