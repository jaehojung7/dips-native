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

const CREATE_WORKOUT_MUTATION = gql`
  mutation createWorkout(
    $programId: Int!
    $workoutIndex: Int!
    $title: String!
  ) {
    createWorkout(
      programId: $programId
      workoutIndex: $workoutIndex
      title: $title
    ) {
      ok
      programId
      workoutIndex
      error
    }
  }
`;

const CREATE_WORKOUT_SET_MUTATION = gql`
  mutation createWorkoutSet(
    $programId: Int!
    $workoutIndex: Int!
    $exercise: [String]
    $setCount: Int! # $rir: Int
  ) {
    createWorkoutSet(
      programId: $programId
      workoutIndex: $workoutIndex
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
  workouts: [
    {
      name: "",
      workoutSets: [{ exercise: "", setCount: "" }],
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
  // const onCreateWorkoutSetCompleted = (data) => {
  //   const {
  //     createWorkoutSet: { ok, id: workoutSetId, error },
  //   } = data;
  //   if (!ok) {
  //     setError("result", {
  //       message: error,
  //     });
  //   }
  // };

  // const onCreateWorkoutCompleted = (data) => {
  //   const {
  //     createWorkout: { ok, programId, workoutIndex, error },
  //   } = data;
  //   if (!ok) {
  //     setError("result", {
  //       message: error,
  //     });
  //   }

  //   const submissionData = getValues();
  //   submissionData.workouts[workoutIndex].workoutSets.map((workoutSet) => {
  //     createWorkoutSetFunction({
  //       variables: {
  //         programId,
  //         workoutIndex,
  //         exercise: workoutSet.exercise,
  //         setCount: parseInt(workoutSet.setCount),
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
  //   submissionData.workouts.map((workout, workoutIndex) => {
  //     createWorkoutFunction({
  //       variables: { programId, workoutIndex, title: workout.name },
  //     });
  //   });
  // };

  // const [createProgramFunction, { loading, error }] = useMutation(
  //   CREATE_PROGRAM_MUTATION,
  //   {
  //     onCompleted: onCreateProgramCompleted,
  //   }
  // );

  // const [createWorkoutFunction] = useMutation(CREATE_WORKOUT_MUTATION, {
  //   onCompleted: onCreateWorkoutCompleted,
  // });

  // const [createWorkoutSetFunction] = useMutation(
  //   CREATE_WORKOUT_SET_MUTATION,
  //   {
  //     onCompleted: onCreateWorkoutSetCompleted,
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
