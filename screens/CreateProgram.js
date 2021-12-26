import React, { useRef, useState } from "react";
import { Switch, Text, View } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../components/AuthInput";
import ScreenLayout from "../components/ScreenLayout";
import MainButton from "../components/MainButton";
import styled from "styled-components/native";
import ColorText from "../styles";

const ToggleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;

const CREATE_PROGRAM_MUTATION = gql`
  mutation createProgram(
    $title: String!
    $description: String
    $isPrivate: Boolean!
  ) {
    createProgram(
      title: $title
      description: $description
      isPrivate: $isPrivate
    ) {
      ok
      id
      error
    }
  }
`;

export default function CreateProgram() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    control,
  } = useForm();
  const [isPrivate, setIsPrivate] = useState(false);
  const toggleSwitch = () => setIsPrivate((previousState) => !previousState);

  const [createProgramFunction, { loading, error }] = useMutation(
    CREATE_PROGRAM_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { title, description } = getValues();
    console.log(title, description, isPrivate);
    createProgramFunction({
      variables: { title, description, isPrivate },
    });
  };

  const onCompleted = (data) => {
    const {
      createProgram: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  useEffect(() => {
    register("title", {
      required: true,
    });
    register("description", {
      required: true,
    });
  }, [register]);

  return (
    <ScreenLayout>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={watch("title")}
            placeholder="프로그램 이름"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("title", text)}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={watch("description")}
            placeholder="프로그램 설명"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("description", text)}
          />
        )}
      />
      <ToggleContainer>
        <ColorText>Public</ColorText>
        <Switch
          trackColor={{ true: "#42a5f5" }}
          thumbColor="#FF7F50"
          ios_backgroundColor="gray"
          onValueChange={toggleSwitch}
          value={isPrivate}
        />
        <ColorText>Private</ColorText>
      </ToggleContainer>
      <MainButton
        text="새 프로그램 저장"
        loading={loading}
        disabled={!watch("title")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </ScreenLayout>
  );
}
