import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateSetButton from "./AddTemplateSetButton";
import DeleteTemplateSetButton from "./DeleteTemplateSetButton";

const TemplateSetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ExerciseTitle = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  width: 75%;
`;

const SetCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  width: 15%;
`;

export default function TemplateSetArray({ templateIndex, control, setValue }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `templates[${templateIndex}].templateSets`,
  });

  return (
    <>
      {fields.map((item, templateSetIndex) => {
        return (
          <TemplateSetContainer key={item.id}>
            <Controller
              name={`templates[${templateIndex}].templateSets[${templateSetIndex}].exercise`}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <ExerciseTitle
                  placeholder="Exercise"
                  placeholderTextColor="#797d7f"
                  onChangeText={(text) =>
                    setValue(
                      `templates[${templateIndex}].templateSets[${templateSetIndex}].exercise`,
                      text
                    )
                  }
                />
              )}
            />
            <Controller
              name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <SetCount
                  keyboardType="numeric"
                  type="number"
                  placeholder="0"
                  placeholderTextColor="#797d7f"
                  onChangeText={(text) =>
                    setValue(
                      `templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`,
                      text
                    )
                  }
                />
              )}
            />
            <DeleteTemplateSetButton onPress={() => remove(templateSetIndex)} />
          </TemplateSetContainer>
        );
      })}

      <AddTemplateSetButton
        onPress={() => {
          append({});
        }}
      />
    </>
  );
}
