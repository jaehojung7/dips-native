import React, { useRef, useState } from "react";
import { Switch } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TemplateInput, TitleInput } from "../components/StyledInput";
import styled from "styled-components/native";
import ColorText from "../styles";

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 35px;
`;

const ToggleContainer = styled.View`
margin-left: 35px
align-items: center;
`;
const ToggleSwitch = styled.View`
  margin-top: 7px;
`;

const TitleContainer = styled.View`
  align-items: center;
`;

const ProgramDescription = styled.TextInput`
    color: ${(props) => props.theme.fontColor};
  background-color: #e5e7e9;
  padding: 10px 15px;
  font-size: 14px
  border-radius: 5px;
  height: 40px;
  /* border: 1px solid ${(props) => props.theme.gray}; */
  margin-bottom: ${(props) => (props.lastOne ? "17" : 13)}px;
`;

export default function ProgramHeader() {
  const { register, setValue, getValues, control } = useForm();
  const [isPrivate, setIsPrivate] = useState(false);
  const toggleSwitch = () => setIsPrivate((previousState) => !previousState);

  return (
    <HeaderContainer>
      <TitleContainer>
        <Controller
          name="programTitle"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TitleInput
              placeholder="프로그램 이름"
              placeholderTextColor="gray"
              onChangeText={(text) => setValue("programTitle", text)}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <ProgramDescription
              placeholder="프로그램 설명"
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={(text) => setValue("description", text)}
            />
          )}
        />
      </TitleContainer>

      <ToggleContainer>
        <ColorText>프로그램 공개</ColorText>
        <ToggleSwitch>
          <Switch
            trackColor={{ true: "#42a5f5" }}
            // thumbColor="#42a5f5"
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            ios_backgroundColor="#e5e7e9"
            onValueChange={toggleSwitch}
            value={isPrivate}
          />
        </ToggleSwitch>
      </ToggleContainer>
    </HeaderContainer>
  );
}
