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
import DismissKeyboard from "../components/DismissKeyboard";

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

const CREATE_TEMPLATE_MUTATION = gql`
  mutation createTemplate($programId: Int!, $title: String!) {
    createTemplate(programId: $programId, title: $title) {
      ok
      id
      error
    }
  }
`;

const CREATE_TEMPLATE_SET_MUTATION = gql`
  mutation createTemplateSet(
    $templateId: Int!
    $exercise: [String]
    $setCount: Int!
    $rir: Int
  ) {
    createTemplateSet(
      templateId: $templateId
      exercise: $exercise
      setCount: $setCount
      rir: $rir
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

  const onCreateTemplateSetCompleted = (data) => {
    const {
      createTemplateSet: { ok, id, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  const onCreateTemplateCompleted = (data) => {
    const {
      createTemplate: { ok, id: templateId, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    const { setCount } = getValues();
    createTemplateSetFunction({
      variables: { templateId, setCount },
    });
  };

  const onCreateProgramCompleted = (data) => {
    const {
      createProgram: { ok, id: programId, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    const { workoutTitle } = getValues();
    createTemplateFunction({
      variables: { programId, title: workoutTitle },
    });
  };

  // useMutation
  const [createProgramFunction, { loading, error }] = useMutation(
    CREATE_PROGRAM_MUTATION,
    {
      onCompleted: onCreateProgramCompleted,
    }
  );

  const [createTemplateFunction] = useMutation(CREATE_TEMPLATE_MUTATION, {
    onCompleted: onCreateTemplateCompleted,
  });

  const [createTemplateSetFunction] = useMutation(
    CREATE_TEMPLATE_SET_MUTATION,
    {
      onCreateTemplateSetCompleted,
    }
  );

  // onSubmitValid
  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { programTitle, description } = getValues();
    createProgramFunction({
      variables: { title: programTitle, description, isPrivate },
    });
  };

  // useEffect(() => {
  //   register("programTitle", {
  //     required: true,
  //   });
  //   register("description", {
  //     required: false,
  //   });
  // }, [register]);

  return (
    <ScreenLayout>
      <Controller
        name="programTitle"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
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
          <TextInput
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

      <Controller
        name="workoutTitle"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="워크아웃 이름"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("workoutTitle", text)}
          />
        )}
      />

      <Controller
        name="setCount"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="워크아웃 이름"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("workoutTitle", text)}
          />
        )}
      />
      <MainButton
        text="새 프로그램 저장"
        loading={loading}
        disabled={!watch("programTitle")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </ScreenLayout>
  );
}
