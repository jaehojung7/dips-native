import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";
import TemplateSetArray from "./TemplateSetArray";
import ExpandSetButton from "./ExpandSetButton";

const TemplateContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  margin: 5px 10px;
`;

const ExerciseTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ExerciseTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 700;
  padding: 0 10px;
  color: ${(props) => props.theme.fontColor};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 7px 0;
`;

export default function TemplateArray({ control, setValue, getValues }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "templates",
  });
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {fields.map((item, templateIndex) => {
        return (
          <TemplateContainer key={item.id}>
            <ExerciseTitleContainer>
              <ExerciseTitle
                placeholder="운동 이름"
                placeholderTextColor="#999999"
                onChangeText={(text) =>
                  setValue(`templates[${templateIndex}].name`, text)
                }
              />
              <ExpandSetButton
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setExpanded(!expanded);
                }}
              />
            </ExerciseTitleContainer>
            {expanded && (
              <TemplateSetArray
                templateIndex={templateIndex}
                {...{ control, setValue }}
              />
            )}
          </TemplateContainer>
        );
      })}
      <ButtonContainer>
        <AddDeleteExerciseButton
          text="운동 추가"
          onPress={() => {
            append({});
          }}
        />
        <AddDeleteExerciseButton
          text="운동 삭제"
          onPress={() => {
            remove({});
          }}
        />
      </ButtonContainer>
    </>
  );
}
