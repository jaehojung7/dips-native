import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { Modal } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import WorkoutArray from "../components/create-program/WorkoutArray";
import ExerciseListModal from "./ExerciseListModal";
import { ME_QUERY } from "./Program";

const TitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 22px;
  font-weight: 600;
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
    $exercise: String!
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

const Container = styled.ScrollView`
  margin: 20px 10px;
  /* border: 1px solid black; */
`;

const TitleContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 15px;
  padding: 15px 25px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
  /* border: 1px solid ${(props) => props.theme.gray}; */
`;

// Passing empty strings as default values creates one empty form automatically
const defaultValues = {
  workouts: [
    {
      name: "",
      workoutSets: [{}],
    },
  ],
};

export default function CreateProgram({ navigation, route }) {
  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({
      defaultValues,
    });
  const { exercises } = route.params;
  const [isPrivate, setIsPrivate] = useState(false);
  const [workoutIndexState, setWorkoutIndexState] = useState(0);
  const [workoutSetIndexState, setWorkoutSetIndexState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => setIsPrivate((previousState) => !previousState);

  const onCreateWorkoutSetCompleted = (data) => {
    const {
      createWorkoutSet: { ok, id: workoutSetId, error },
    } = data;
    if (ok) {
      navigation.navigate("StackProgram");
    }
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
    submissionData.workouts.map((workout, workoutIndex) => {
      createWorkoutFunction({
        variables: { programId, workoutIndex, title: workout.name },
      });
    });
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
    refetchQueries: [{ query: ME_QUERY }],
  });

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
      <Container showsVerticalScrollIndicator={false}>
        <TitleContainer>
          <Controller
            name="programTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TitleInput
                placeholder="프로그램 이름"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("programTitle", text)}
              />
            )}
          />
        </TitleContainer>

        {/* <ToggleContainer>
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
          </ToggleContainer> */}

        <WorkoutArray
          {...{
            control,
            setValue,
            setWorkoutIndexState,
            setWorkoutSetIndexState,
            setModalVisible,
          }}
        />

        <MainButton
          text="새 프로그램 저장"
          loading={loading}
          disabled={!watch("programTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ExerciseListModal
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
