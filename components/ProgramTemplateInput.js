import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import ColorText from "../styles";

const TemplateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ExerciseInput = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px
  border-radius: 5px;
  margin-bottom: 10px;
  width: 75%;
`;

const SetInput = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px
  border-radius: 5px;
  margin-bottom: 10px;
  width: 15%;
`;

export default function ProgramTemplateInput() {
  const { register, setValue, getValues, control } = useForm();
  return (
    <TemplateContainer>
      <Controller
        name="ExerciseTitle"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ExerciseInput
            placeholder="Exercise"
            placeholderTextColor="#797d7f"
            onChangeText={(text) => setValue("ExerciseTitle", text)}
          />
        )}
      />
      <Controller
        name="setCount"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <SetInput
            keyboardType="numeric"
            placeholderTextColor="#797d7f"
            onChangeText={(text) => setValue("setCount", text)}
          />
        )}
      />
    </TemplateContainer>
  );
}
