import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import CloseTemplateButton from "../Buttons/CloseTemplateButton";
import AddTemplateButton from "../Buttons/AddTemplateButton";
import TemplateSetArray from "./TemplateSetArray";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0;
`;

const Container = styled.View``;

const TemplateContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  /* background-color: #ececec; */
  padding: 15px 20px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ExerciseContainer = styled.View`
  margin: 10px 0;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

export default function TemplateArray({ control, setValue, getValues }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "templates",
  });

  return (
    <Container>
      {fields.map((item, templateIndex) => {
        return (
          <TemplateContainer key={item.id}>
            <TitleContainer>
              <Controller
                name={`templates[${templateIndex}].name`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <WorkoutTitle
                    placeholder="워크아웃 이름"
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(`templates[${templateIndex}].name`, text)
                    }
                  />
                )}
              />
              <CloseTemplateButton
                text="닫기"
                onPress={() => remove(templateIndex)}
              />
            </TitleContainer>

            <ExerciseContainer>
              <TemplateSetArray
                templateIndex={templateIndex}
                {...{ control, setValue }}
              />
            </ExerciseContainer>
          </TemplateContainer>
        );
      })}

      <AddTemplateButton
        onPress={() => {
          append({});
        }}
      />
    </Container>
  );
}
