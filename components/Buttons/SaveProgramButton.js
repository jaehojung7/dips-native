import React, { useState } from "react";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

const EDIT_PROGRAM_MUTATION = gql`
  mutation editProgram(
    $id: Int!
    $title: String!
    $description: String
    $isPrivate: Boolean!
  ) {
    editProgram(
      id: $id
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
    $exercise: String
    $setCount: Int!
    $repCount: Int
  ) {
    createWorkoutSet(
      programId: $programId
      workoutIndex: $workoutIndex
      exercise: $exercise
      setCount: $setCount
      repCount: $repCount
    ) {
      ok
      id
      error
    }
  }
`;

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.blue};
  /* margin: 10px; */
  width: 45%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin: 0 5px;
  text-align: center;
`;

export default function SaveProgramButton({
  program,
  handleSubmit,
  getValues,
}) {
  const [isPrivate, setIsPrivate] = useState(false);

  const onCreateWorkoutSetCompleted = (data) => {
    const {
      createWorkoutSet: { ok, id: workoutSetId, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  const onCreateWorkoutCompleted = (data) => {
    const {
      createWorkout: { ok, programId, workoutIndex, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }

    const submissionData = getValues();
    submissionData.workouts[workoutIndex].workoutSets.map((workoutSet) => {
      createWorkoutSetFunction({
        variables: {
          programId,
          workoutIndex,
          exercise: workoutSet.exercise,
          setCount: parseInt(workoutSet.setCount),
          repCount: parseInt(workoutSet.repCount),
        },
      });
    });
  };

  const onEditProgramCompleted = (data) => {
    const {
      editProgram: { ok, id: programId, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }

    const submissionData = getValues();
    submissionData.workouts.map((workout, workoutIndex) => {
      createWorkoutFunction({
        variables: { programId, workoutIndex, title: workout.name },
      });
    });
  };

  const [editProgramFunction, { loading, error }] = useMutation(
    EDIT_PROGRAM_MUTATION,
    {
      onCompleted: onEditProgramCompleted,
    }
  );

  const [createWorkoutFunction] = useMutation(CREATE_WORKOUT_MUTATION, {
    onCompleted: onCreateWorkoutCompleted,
  });

  const [createWorkoutSetFunction] = useMutation(CREATE_WORKOUT_SET_MUTATION, {
    onCompleted: onCreateWorkoutSetCompleted,
  });

  const onSubmitValid = (submissionData) => {
    console.log("onSubmitValid done");
    if (loading) {
      return;
    }
    const { programTitle } = getValues();
    editProgramFunction({
      variables: { title: programTitle, isPrivate },
    });
  };
  return (
    <ButtonContainer onPress={handleSubmit(onSubmitValid)}>
      <ButtonText>저장</ButtonText>
    </ButtonContainer>
  );
}
