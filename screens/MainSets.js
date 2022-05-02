import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import WorkoutButton from "../components/Buttons/WorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import ExerciseArray from "../components/create-record/ExerciseArray";

const CREATE_RECORD_MUTATION = gql`
  mutation createRecord(
    $title: String!
    $description: String
    $baseProgramId: Int
    $baseWorkoutIndex: Int
  ) {
    createRecord(
      title: $title
      description: $description
      baseProgramId: $baseProgramId
      baseWorkoutIndex: $baseWorkoutIndex
    ) {
      ok
      id
      error
    }
  }
`;

const CREATE_RECORD_EXERCISE_MUTATION = gql`
  mutation createWorkout(
    $recordId: Int!
    $recordExerciseIndex: Int!
    $exercise: String!
  ) {
    createWorkout(
      recordId: $recordId
      recordExerciseIndex: $recordExerciseIndex
      exercise: $exercise
    ) {
      ok
      recordId
      recordExerciseIndex
      error
    }
  }
`;

const CREATE_RECORD_EXERCISE_SET_MUTATION = gql`
  mutation createWorkoutSet(
    $recordId: Int!
    $recordExerciseIndex: Int!
    $weight: Int!
    $repCount: Int!
  ) {
    createWorkoutSet(
      recordId: $recordId
      recordExerciseIndex: $recordExerciseIndex
      exercise: $exercise
      weight: $weight
      repCount: $repCount
    ) {
      ok
      id
      error
    }
  }
`;

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const ButtonContainer = styled.View`
  padding: 0 15px;
`;

const HeaderContainer = styled.View`
  margin: 0px 15px 15px 15px;
`;

const WorkoutTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
`;

const WorkoutTitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
`;

// Passing empty strings as default values creates one empty form automatically

const defaultValues = {
  recordExercises: [
    {
      name: "",
      recordExerciseSets: [{}],
    },
  ],
};

export default function MainSets({ route }) {
  let { workout } = route?.params;
  if (workout === undefined) {
    workout = {};
  }

  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({
      defaultValues,
    });

  const onCreateRecordExerciseSetCompleted = (data) => {
    const {
      createRecordExerciseSet: { ok, id: workoutSetId, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  const onCreateRecordExerciseCompleted = (data) => {
    const {
      createRecordExercise: { ok, recordId, workoutIndex, error },
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

  const onCreateRecordCompleted = (data) => {
    const {
      createRecord: { ok, id: recordId, error },
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
    navigation.navigate("StackRecord");
  };

  const [createRecordFunction, { loading, error }] = useMutation(
    CREATE_RECORD_MUTATION,
    {
      onCompleted: onCreateRecordCompleted,
    }
  );

  const [createRecordExerciseFunction] = useMutation(
    CREATE_RECORD_EXERCISE_MUTATION,
    {
      onCompleted: onCreateRecordExerciseCompleted,
    }
  );

  const [createWorkoutSetFunction] = useMutation(
    CREATE_RECORD_EXERCISE_SET_MUTATION,
    {
      onCompleted: onCreateRecordExerciseSetCompleted,
      // Creating a new program object directly in Apollo cache is probably better
      // refetchQueries: [{ query: ME_QUERY }],
    }
  );

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { recordTitle } = getValues();
    createRecordFunction({
      variables: {
        title: recordTitle,
        description,
        baseProgramId,
        baseWorkoutIndex,
      },
    });
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Controller
            name="recordTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <WorkoutTitleInput
                placeholder="워크아웃 제목"
                defaultValue={workout ? workout.title : ""}
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("recordTitle", text)}
              />
            )}
          />
        </HeaderContainer>

        <ExerciseArray
          {...{
            control,
            setValue,
          }}
          workout={workout}
        />

        <ButtonContainer>
          <WorkoutButton
            text="워크아웃 기록 저장"
            // loading={loading}
            disabled={!watch("recordTitle")}
            onPress={handleSubmit(onSubmitValid)}
          />
        </ButtonContainer>
      </Container>
    </DismissKeyboard>
  );
}
