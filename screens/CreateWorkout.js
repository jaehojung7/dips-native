import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import WorkoutButton from "../components/Buttons/WorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import TemplateArray from "../components/create-workout/TemplateArray";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const WorkoutTitle = styled.Text`
  font-size: 23px;
  font-weight: 700;
  padding: 0 15px;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 15px;
`;

const WorkoutTitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
`;

const ExerciseContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 20px;
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

export default function CreateWorkout({ route }) {
  const { workout } = route?.params;
  console.log(workout);
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
        <WorkoutTitle>
          <Controller
            name="WorkoutTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <WorkoutTitleInput
                value={watch("workoutTitle")}
                placeholder="워크아웃 이름"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("WorkoutTitle", text)}
              />
            )}
          />
        </WorkoutTitle>

        {/* {program?.templates.map((workout, workoutIndex) => {
          return (
            <WorkoutContainer key={workoutIndex}>
              <WorkoutTitle>
                워크아웃 {workoutIndex + 1}. {workout.title}
              </WorkoutTitle>
              <ExerciseContainer>
                <ExerciseTitle>
                  스쿼트 데드리프트 밀리터리프레스 딥스 인클라인 벤치프레스
                </ExerciseTitle>
              </ExerciseContainer>
            </WorkoutContainer>
          );
        })} */}

        <TemplateArray
          {...{
            control,
            getValues,
            setValue,
          }}
        />

        <WorkoutButton
          text="워크아웃 기록 저장"
          // loading={loading}
          disabled={!watch("WorkoutTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />
      </Container>
    </DismissKeyboard>
  );
}
