import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import WorkoutButton from "../components/Buttons/WorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import TemplateArray from "../components/create-workout/TemplateArray";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0 15px 0;
`;

const Container = styled.ScrollView`
  margin: 20px 0;
`;

const ExerciseContainer = styled.View`
  /* flex-direction: row;
  align-items: center;
  justify-content: space-between; */
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 5px 10px;
  border: 1px solid green;
`;

const ExerciseTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const ExerciseTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  padding: 5px 10px;
  color: ${(props) => props.theme.fontColor};
`;

const WorkoutTitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
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

  // const onCreateTemplateSetCompleted = (data) => {
  //   const {
  //     createTemplateSet: { ok, id: templateSetId, error },
  //   } = data;
  //   if (!ok) {
  //     setError("result", {
  //       message: error,
  //     });
  //   }
  // };

  // const onCreateTemplateCompleted = (data) => {
  //   const {
  //     createTemplate: { ok, programId, templateIndex, error },
  //   } = data;
  //   if (!ok) {
  //     setError("result", {
  //       message: error,
  //     });
  //   }

  //   const submissionData = getValues();
  //   submissionData.templates[templateIndex].templateSets.map((templateSet) => {
  //     createTemplateSetFunction({
  //       variables: {
  //         programId,
  //         templateIndex,
  //         exercise: templateSet.exercise,
  //         setCount: parseInt(templateSet.setCount),
  //       },
  //     });
  //   });
  // };

  // const onCreateProgramCompleted = (data) => {
  //   const {
  //     createProgram: { ok, id: programId, error },
  //   } = data;
  //   if (!ok) {
  //     setError("result", {
  //       message: error,
  //     });
  //   }

  //   const submissionData = getValues();
  //   submissionData.templates.map((template, templateIndex) => {
  //     createTemplateFunction({
  //       variables: { programId, templateIndex, title: template.name },
  //     });
  //   });
  // };

  // const [createProgramFunction, { loading, error }] = useMutation(
  //   CREATE_PROGRAM_MUTATION,
  //   {
  //     onCompleted: onCreateProgramCompleted,
  //   }
  // );

  // const [createTemplateFunction] = useMutation(CREATE_TEMPLATE_MUTATION, {
  //   onCompleted: onCreateTemplateCompleted,
  // });

  // const [createTemplateSetFunction] = useMutation(
  //   CREATE_TEMPLATE_SET_MUTATION,
  //   {
  //     onCompleted: onCreateTemplateSetCompleted,
  //   }
  // );

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
        <TemplateArray
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
            // disabled={!watch("WorkoutTitle")}
            onPress={handleSubmit(onSubmitValid)}
          />
        </ButtonContainer>
      </Container>
    </DismissKeyboard>
  );
}
