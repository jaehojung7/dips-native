import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AuthInput, TemplateInput } from "./StyledInput";
import ScreenLayout from "./ScreenLayout";
import MainButton from "./MainButton";
import styled from "styled-components/native";
import ColorText from "../styles";
import ProgramTemplateInput from "./TemplateFormat";

const HeaderContainer = styled.View`
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px 15px;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 16px;
  padding: 5px 0 0 5px;
`;

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 10px;
`;

export default function ProgramTemplate() {
  const { register, setValue, getValues, control } = useForm();
  return (
    <HeaderContainer>
      <Controller
        name="WorkoutTitle"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <WorkoutTitle
            placeholder="워크아웃 이름 (루틴)"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("WorkoutTitle", text)}
          />
        )}
      />
      <IndexContainer>
        <ColorText>운동 이름</ColorText>
        <ColorText>세트</ColorText>
        <ColorText>RIR</ColorText>
      </IndexContainer>
      <ProgramTemplateInput />
      <ProgramTemplateInput />
    </HeaderContainer>
  );
}
