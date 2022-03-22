import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import WorkoutButton from "../components/Buttons/WorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import WarmupArray from "../components/create-workout/WarmupArray";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const ButtonContainer = styled.View`
  padding: 0 15px;
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

export default function Workout({ route }) {
  let { workout } = route?.params;
  if (workout === undefined) {
    workout = {};
  }
  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({
      defaultValues: {
        workoutTitle: workout.title,
      },
    });
  const [expanded, setExpanded] = useState(false);

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { programTitle, description } = getValues();
    createProgramFunction({
      variables: { title: programTitle, description },
    });
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <WarmupArray
          {...{
            control,
            getValues,
            setValue,
          }}
        />
        <ButtonContainer>
          <WorkoutButton
            text="워크아웃 기록 저장"
            // loading={loading}
            disabled={!watch("WorkoutTitle")}
            onPress={handleSubmit(onSubmitValid)}
          />
        </ButtonContainer>
      </Container>
    </DismissKeyboard>
  );
}
