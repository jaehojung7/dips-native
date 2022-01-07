import React, { useRef, useState } from "react";
import { Switch } from "react-native";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import ColorText from "../styles";

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 35px;
  margin-bottom: 15px;
`;

const TitleContainer = styled.View`
  align-items: center;
`;

const TitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px
  border-radius: 5px;
  margin-bottom: 5px;
`;

const DescriptionInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.lightgray};
  padding: 10px 15px;
  font-size: 14px
  border-radius: 5px;
  height: 40px;
`;

const ToggleContainer = styled.View`
margin-left: 35px
align-items: center;
`;
const ToggleSwitch = styled.View`
  margin-top: 7px;
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
              placeholderTextColor="#797d7f"
              onChangeText={(text) => setValue("programTitle", text)}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DescriptionInput
              placeholder="프로그램 설명"
              placeholderTextColor="#797d7f"
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
            ios_backgroundColor="#cacfd2"
            onValueChange={toggleSwitch}
            value={isPrivate}
          />
        </ToggleSwitch>
      </ToggleContainer>
    </HeaderContainer>
  );
}
