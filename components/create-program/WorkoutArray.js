import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import ExerciseArray from "./ExerciseArray";
import AddDeleteWorkoutButton from "./AddDeleteWorkoutButton";

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
  padding: 15px 15px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const ExerciseContainer = styled.View`
  margin: 10px 0;
`;

export default function WorkoutArray({ control, setValue, getValues }) {
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
            </TitleContainer>
            <BorderLine />
            <ExerciseContainer>
              <ExerciseArray
                templateIndex={templateIndex}
                {...{ control, setValue }}
              />
            </ExerciseContainer>
          </TemplateContainer>
        );
      })}

      <AddDeleteWorkoutButton
        text="워크아웃 추가"
        onPress={() => {
          append({});
        }}
      />
      <AddDeleteWorkoutButton
        text="워크아웃 삭제"
        onPress={() => {
          remove({});
        }}
      />
    </Container>
  );
}
