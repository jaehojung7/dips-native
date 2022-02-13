import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";
import TemplateSetArray from "./TemplateSetArray";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0 15px 0;
`;

const TemplateContainer = styled.View`
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 700;
  padding: 5px 10px;
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

  return (
    <>
      {fields.map((item, templateIndex) => {
        return (
          <TemplateContainer key={item.id}>
            <WorkoutTitle
              placeholder="운동 이름"
              placeholderTextColor="#999999"
              onChangeText={(text) =>
                setValue(`templates[${templateIndex}].name`, text)
              }
            />
            <BorderLine />
            <TemplateSetArray
              templateIndex={templateIndex}
              {...{ control, setValue }}
            />
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
