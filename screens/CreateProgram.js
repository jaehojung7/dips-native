import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../components/MainButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Switch } from "react-native";
import TemplateArray from "../components/create-program/TemplateArray";

const Container = styled.ScrollView`
  padding: 0 15px;
  margin-top: 15px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 35px;
  margin-bottom: 15px;
`;

const TitleContainer = styled.View`
  align-items: center;
`;

const ToggleContainer = styled.View`
  margin-left: 35px;
  align-items: center;
`;

const ToggleText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const ToggleSwitch = styled.View`
  margin-top: 7px;
`;

const TitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 5px;
  height: 40px;
`;

const DescriptionInput = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  height: 40px;
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
  mutation createTemplate(
    $programId: Int!
    $templateIndex: Int!
    $title: String!
  ) {
    createTemplate(
      programId: $programId
      templateIndex: $templateIndex
      title: $title
    ) {
      ok
      programId
      templateIndex
      error
    }
  }
`;

const CREATE_TEMPLATE_SET_MUTATION = gql`
  mutation createTemplateSet(
    $programId: Int!
    $templateIndex: Int!
    $exercise: [String]
    $setCount: Int! # $rir: Int
  ) {
    createTemplateSet(
      programId: $programId
      templateIndex: $templateIndex
      exercise: $exercise
      setCount: $setCount # rir: $rir
    ) {
      ok
      id
      error
    }
  }
`;

// Passing empty strings as default values creates one empty form automatically
const defaultValues = {
  templates: [
    {
      name: "",
      templateSets: [{ exercise: "", setCount: "" }],
    },
  ],
};

export default function CreateProgram() {
  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({
      defaultValues,
    });

  const [isPrivate, setIsPrivate] = useState(false);

  const toggleSwitch = () => setIsPrivate((previousState) => !previousState);

  const onCreateTemplateSetCompleted = (data) => {
    const {
      createTemplateSet: { ok, id: templateSetId, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  const onCreateTemplateCompleted = (data) => {
    const {
      createTemplate: { ok, programId, templateIndex, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }

    const submissionData = getValues();
    submissionData.templates[templateIndex].templateSets.map((templateSet) => {
      createTemplateSetFunction({
        variables: {
          programId,
          templateIndex,
          exercise: templateSet.exercise,
          setCount: parseInt(templateSet.setCount),
        },
      });
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

    const submissionData = getValues();
    submissionData.templates.map((template, templateIndex) => {
      createTemplateFunction({
        variables: { programId, templateIndex, title: template.name },
      });
    });
  };

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
      onCompleted: onCreateTemplateSetCompleted,
    }
  );

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { programTitle, description } = getValues();
    createProgramFunction({
      variables: { title: programTitle, description, isPrivate },
    });
  };

  return (
    <DismissKeyboard>
      <Container>
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
            <ToggleText>프로그램 공개</ToggleText>
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

        <TemplateArray
          {...{
            control,
            getValues,
            setValue,
          }}
        />

        <MainButton
          text="새 프로그램 저장"
          loading={loading}
          disabled={!watch("programTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />
      </Container>
    </DismissKeyboard>
  );
}
