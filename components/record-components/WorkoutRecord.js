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

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  padding: 0 5px;
`;

export default function WorkoutRecord() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <TitleContainer>
        <ContainerTitle>Mar. 15 2022</ContainerTitle>
        <ExpandSetButton
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setExpanded(!expanded);
          }}
        />
      </TitleContainer>
      {expanded && <WorkoutRecordSet />}
    </>
  );
}
