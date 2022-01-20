import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateButton from "./AddTemplateButton";
import DeleteTemplateButton from "./DeleteTemplateButton";
import TemplateSetArray from "./TemplateSetArray";
import Swipeable from "react-native-gesture-handler/Swipeable";

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
                    placeholder="운동 선택"
                    placeholderTextColor="#797d7f"
                    onChangeText={(text) =>
                      setValue(`templates[${templateIndex}].name`, text)
                    }
                  />
                )}
              />

              <DeleteTemplateButton onPress={() => remove(templateIndex)} />
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
