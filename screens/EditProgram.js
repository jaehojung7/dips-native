import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Modal } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import WorkoutArray from "../components/create-program/WorkoutArray";
import ExerciseListModal from "./ExerciseListModal";
import DeleteProgramButton from "../components/Buttons/DeleteProgramButton";
import { ME_QUERY } from "./Program";

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
  /* border: 1px solid black; */
`;

const TitleContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 15px;
  padding: 15px 25px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
`;

const TitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 22px;
  font-weight: 600;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SaveProgramButton = styled.TouchableOpacity`
  padding: 12px 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.blue};
  margin: 5px 0;
  width: 49%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin: 0 5px;
  text-align: center;
`;

export default function EditProgram({ navigation, route }) {
  const { program } = route.params;
  const { exercises } = route.params;

  const processDefaultValues = (program) => {
    const processWorkoutSets = (workoutSets) => {
      return workoutSets.map((workoutSet) => ({
        exercise: workoutSet.exercise,
        setCount: workoutSet.setCount,
        repCount: workoutSet.repCount,
      }));
    };

    const processWorkouts = (workouts) => {
      return workouts.map((workout) => ({
        title: workout.title,
        workoutSets: processWorkoutSets(workout.workoutSets),
      }));
    };

    return {
      programTitle: program.title,
      workouts: processWorkouts(program.workouts),
    };
  };

  const defaultValues = processDefaultValues(program);

  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({ defaultValues });
  const [isPrivate, setIsPrivate] = useState(false);
  const [workoutIndexState, setWorkoutIndexState] = useState(0);
  const [workoutSetIndexState, setWorkoutSetIndexState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => setIsPrivate((previousState) => !previousState);

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
        variables: { programId, workoutIndex, title: workout.title },
      });
    });

    navigation.navigate("StackProgram");
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
    refetchQueries: [{ query: ME_QUERY }], // Creating a new program object directly in Apollo cache is probably better
  });

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { programTitle, description } = getValues();
    editProgramFunction({
      variables: {
        id: program.id,
        title: programTitle,
        description,
        isPrivate,
      },
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
            render={({ field: { value } }) => (
              <TitleInput
                // value={watch("programTitle")}
                defaultValue={defaultValues.programTitle}
                placeholder="프로그램 이름"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("programTitle", text)}
              />
            )}
          />
        </TitleContainer>

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
        <ButtonContainer>
          <SaveProgramButton
            loading={loading}
            disabled={!watch("programTitle")}
            onPress={handleSubmit(onSubmitValid)}
          >
            <ButtonText>저장</ButtonText>
          </SaveProgramButton>

          <DeleteProgramButton
            text="삭제"
            program={program}
            {...{ navigation }}
          />
        </ButtonContainer>
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
