import { React, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
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
  margin-top: 10px;
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

export default function ExerciseRecordSet() {
  return (
    <>
      <IndexContainer>
        <IndexText>Date</IndexText>
        <IndexText>Total volume</IndexText>
        <IndexText>Best set</IndexText>
      </IndexContainer>
      <BorderLine />

      <RecordSetContainer>
        <IndexText>3/15</IndexText>
        <IndexText>1250 kg</IndexText>
        <IndexText>50kg x 5</IndexText>
      </RecordSetContainer>
    </>
  );
}
