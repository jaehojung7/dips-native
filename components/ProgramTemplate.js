import React from "react";
import { Controller, useForm } from "react-hook-form";
import ScreenLayout from "./ScreenLayout";
import styled from "styled-components/native";
import ColorText from "../styles";
import ProgramTemplateInput from "./ProgramTemplateInput";
import AddExerciseButton from "./AddExerciseButton";

const HeaderContainer = styled.View`
  margin-bottom: 10px;
  border: 1px solid #797d7f;
  border-radius: 5px;
  padding: 5px 15px;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 16px;
  padding: 5px 0 0 5px;
  color: ${(props) => props.theme.fontColor};
`;

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 7px 0;
  padding: 0 7px;
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
            placeholder="워크아웃 이름(Routine)"
            placeholderTextColor="#797d7f"
            onChangeText={(text) => setValue("WorkoutTitle", text)}
          />
        )}
      />
      <IndexContainer>
        <ColorText>운동 이름</ColorText>
        <ColorText>세트</ColorText>
      </IndexContainer>
      <ProgramTemplateInput />
      <AddExerciseButton />
    </HeaderContainer>
  );
}
