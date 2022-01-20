import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateButton from "./AddTemplateButton";
import DeleteTemplateButton from "./DeleteTemplateButton";
import TemplateSetArray from "./TemplateSetArray";

const TemplateContainer = styled.View`
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.darkgray};
  border-radius: 5px;
  padding: 5px 15px;
`;

const TemplateHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 16px;
  padding: 0 5px;
  color: ${(props) => props.theme.fontColor};
`;

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 7px 0;
  padding: 0 37px 0 7px;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
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
              <Controller
                name={`templates[${templateIndex}].name`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <WorkoutTitle
                    placeholder="워크아웃 이름 (Routine)"
                    placeholderTextColor="#797d7f"
                    onChangeText={(text) =>
                      setValue(`templates[${templateIndex}].name`, text)
                    }
                  />
                )}
              />
              <DeleteTemplateButton onPress={() => remove(templateIndex)} />
            </TemplateHeader>
            <IndexContainer>
              <IndexText>운동 이름</IndexText>
              <IndexText>세트</IndexText>
            </IndexContainer>
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
