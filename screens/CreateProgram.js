import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { Modal, Switch, Alert, TouchableOpacity, Platform } from "react-native";
import WorkoutArray from "../components/create-program/WorkoutArray";
import { ME_QUERY } from "./Program";
import ExerciseListModalProgram from "./ExerciseListModalProgram";
import { FontAwesome5 } from "@expo/vector-icons";
import FormError from "../components/record-components/FormError";
import {
  Container,
  TitleContainer,
  TitleInput,
} from "../components/layouts/MainContainer";
import {
  ToggleContainer,
  ToggleInfoText,
  ToggleText,
} from "../components/layouts/Toggle";
import DismissKeyboard from "../components/DismissKeyboard";

const CREATE_PROGRAM_MUTATION = gql`
  mutation createProgram(
    $title: String!
    $description: String
    $isPublic: Boolean!
  ) {
    createProgram(
      title: $title
      description: $description
      isPublic: $isPublic
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
    $workoutSetIndex: Int!
    $exercise: String!
    $setCount: Int!
    $repCount: Int!
  ) {
    createWorkoutSet(
      programId: $programId
      workoutIndex: $workoutIndex
      workoutSetIndex: $workoutSetIndex
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

export default function CreateProgram({ navigation, route }) {
  // Passing empty strings as default values creates one empty form automatically
  const defaultValues = {
    programTitle: "",
    workouts: [
      {
        title: "",
        workoutSets: [
          {
            exercise: "",
            setCount: "",
            repCount: "",
          },
        ],
      },
    ],
  };
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { exercises } = route.params;
  const [isPublic, setIsPublic] = useState(false);
  const [workoutIndexState, setWorkoutIndexState] = useState(0);
  const [workoutSetIndexState, setWorkoutSetIndexState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => setIsPublic((previousState) => !previousState);

  const onCreateWorkoutSetCompleted = (data) => {
    const {
      createWorkoutSet: { ok, error },
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
    submissionData.workouts[workoutIndex].workoutSets.map(
      (workoutSet, workoutSetIndex) => {
        createWorkoutSetFunction({
          variables: {
            programId,
            workoutIndex,
            workoutSetIndex,
            exercise: workoutSet.exercise,
            setCount: parseInt(workoutSet.setCount),
            repCount: parseInt(workoutSet.repCount),
          },
        });
      }
    );
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
    if (ok) {
      const submissionData = getValues();
      submissionData.workouts.map((workout, workoutIndex) => {
        createWorkoutFunction({
          variables: { programId, workoutIndex, title: workout.title },
        });
      });
      navigation.navigate("StackProgram");
    }
  };

  const [createProgramFunction, { loading, error }] = useMutation(
    CREATE_PROGRAM_MUTATION,
    {
      onCompleted: onCreateProgramCompleted,
    }
  );

  const [createWorkoutFunction] = useMutation(CREATE_WORKOUT_MUTATION, {
    onCompleted: onCreateWorkoutCompleted,
  });

  const [createWorkoutSetFunction] = useMutation(CREATE_WORKOUT_SET_MUTATION, {
    onCompleted: onCreateWorkoutSetCompleted,
    refetchQueries: [{ query: ME_QUERY }], // Creating a new program object directly in Apollo cache is probably better
  });

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { programTitle, description } = getValues();
    createProgramFunction({
      variables: { title: programTitle, description, isPublic },
    });
  };

  const onClickAlert = () => {
    Alert.alert(
      "Make this program public",
      "Public programs are visible to other users"
    );
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <TitleContainer>
          <Controller
            name="programTitle"
            control={control}
            rules={{
              required: "Program title required",
              minLength: {
                value: 4,
                message: "Program title length between 4 and 21",
              },
              maxLength: {
                value: 21,
                message: "Program title length between 4 and 21",
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TitleInput
                onBlur={onBlur}
                returnKeyType="next"
                placeholder="Program title"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("programTitle", text)}
                onChange={clearLoginError}
              />
            )}
          />
        </TitleContainer>
        <FormError message={errors?.programTitle?.message} />

        <ToggleContainer>
          <ToggleText>Private</ToggleText>
          <Switch
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            onValueChange={toggleSwitch}
            value={isPublic}
          />
          <ToggleText>Public</ToggleText>

          {Platform.OS === "web" ? null : (
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={onClickAlert}>
              <ToggleInfoText>
                <FontAwesome5 name="info-circle" size={20} />
              </ToggleInfoText>
            </TouchableOpacity>
          )}
        </ToggleContainer>

        <WorkoutArray
          {...{
            control,
            setValue,
            defaultValues,
            setWorkoutIndexState,
            setWorkoutSetIndexState,
            setModalVisible,
            errors,
          }}
        />

        <FormError message={errors?.result?.message} />
        <MainButton
          text="Save program"
          loading={loading}
          disabled={!watch("programTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />

        <Modal
          presentationStyle="pageSheet"
          animationType="slide"
          visible={modalVisible}
        >
          <ExerciseListModalProgram
            {...{
              exercises,
              setModalVisible,
              workoutIndexState,
              workoutSetIndexState,
              setValue,
            }}
          />
        </Modal>
      </Container>
    </DismissKeyboard>
  );
}
