import React, { useRef, useState } from "react";
import { Switch } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AuthInput, TemplateInput } from "./StyledInput";
import styled from "styled-components/native";
import ColorText from "../styles";

const TemplateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default function ProgramTemplateInput() {
  const { register, setValue, getValues, control } = useForm();
  return (
    <TemplateContainer>
      <Controller
        name="ExerciseTitle"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TemplateInput
            placeholder="Exercise"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("ExerciseTitle", text)}
          />
        )}
      />
      <Controller
        name="setCount"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TemplateInput
            keyboardType="numeric"
            placeholder="Set"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("setCount", text)}
          />
        )}
      />
      <Controller
        name="RIR"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TemplateInput
            keyboardType="numeric"
            placeholder="RIR"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("RIR", text)}
          />
        )}
      />
    </TemplateContainer>
  );
}
