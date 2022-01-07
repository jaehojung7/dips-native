import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ScreenLayout from "../components/ScreenLayout";
import MainButton from "../components/MainButton";
import styled from "styled-components/native";
import ColorText from "../styles";
import ProgramHeader from "../components/ProgramHeader";
import ProgramTemplate from "../components/ProgramTemplate";
import DismissKeyboard from "../components/DismissKeyboard";
import AddWorkoutButton from "../components/AddWorkoutButton";

const Container = styled.View`
  padding: 0 15px;
  margin-top: 15px;
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
  const { register, handleSubmit, setValue, getValues, watch, setError } =
    useForm();

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

  return (
    <DismissKeyboard>
      <Container>
        <ProgramHeader />
        <ProgramTemplate />
        <AddWorkoutButton />
        <MainButton
          text="새 프로그램 저장"
          loading={loading}
          // disabled={!watch("programTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />
      </Container>
    </DismissKeyboard>
  );
}
