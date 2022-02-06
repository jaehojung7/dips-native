import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateButton from "../Buttons/AddTemplateButton";
import CloseTemplateButton from "../Buttons/CloseTemplateButton";
import TemplateSetArray from "./TemplateSetArray";

const TemplateContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 20px;
`;

const TemplateHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 16px;
  font-weight: 600;
  padding: 7px 0;
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
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
            <TemplateHeader>
              <WorkoutTitle
                placeholder="운동 이름"
                placeholderTextColor="#999999"
                onChangeText={(text) =>
                  setValue(`templates[${templateIndex}].name`, text)
                }
              />
              <CloseTemplateButton
                text="닫기"
                onPress={() => remove(templateIndex)}
              />
            </TemplateHeader>
            <TemplateSetArray
              templateIndex={templateIndex}
              {...{ control, setValue }}
            />
          </TemplateContainer>
        );
      })}

      <AddTemplateButton
        onPress={() => {
          append({});
        }}
      />
    </>
  );
}
