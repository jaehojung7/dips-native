import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { Modal, Switch, Alert } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import WorkoutArray from "../components/create-program/WorkoutArray";
import { ME_QUERY } from "./Program";
import ExerciseListModalProgram from "./ExerciseListModalProgram";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

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
    $repCount: Int
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

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const TitleContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 10px;
  padding: 15px 25px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
`;

const TitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  font-weight: 600;
`;

const ToggleContainer = styled.View`
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ToggleText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-weight: 500;
  font-size: 15px;
  margin-right: 5px;
`;

const ToggleInfoContainer = styled.TouchableOpacity`
  margin-left: 20px;
`;

const ToggleInfoText = styled.Text`
  color: ${(props) => props.theme.mainColor};
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
  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({ defaultValues });
  const { exercises } = route.params;
  const [isPublic, setIsPublic] = useState(false);
  const [workoutIndexState, setWorkoutIndexState] = useState(0);
  const [workoutSetIndexState, setWorkoutSetIndexState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => setIsPublic((previousState) => !previousState);

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

    const submissionData = getValues();
    submissionData.workouts.map((workout, workoutIndex) => {
      createWorkoutFunction({
        variables: { programId, workoutIndex, title: workout.title },
      });
    });

    navigation.navigate("StackProgram");
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
      "Share your program",
      "Turn on the toggle to allow other users can search this program"
    );
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
                maxLength={25}
                placeholder="Program title"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("programTitle", text)}
              />
            )}
          />
        </TitleContainer>
        <ToggleContainer>
          <ToggleText>Share this program</ToggleText>
          <Switch
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            onValueChange={toggleSwitch}
            value={isPublic}
          />
          <ToggleInfoContainer onPress={onClickAlert}>
            <ToggleInfoText>
              <FontAwesome5 name="info-circle" size={20} />
            </ToggleInfoText>
          </ToggleInfoContainer>
        </ToggleContainer>

        <WorkoutArray
          {...{
            control,
            setValue,
            defaultValues,
            setWorkoutIndexState,
            setWorkoutSetIndexState,
            setModalVisible,
          }}
        />

        <MainButton
          text="Save program"
          loading={loading}
          disabled={!watch("programTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
