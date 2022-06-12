import React, { useState, useEffect } from "react";
import { ME_QUERY } from "./Program";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Modal, Switch, Alert } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import WorkoutArray from "../components/create-program/WorkoutArray";
import DeleteProgramButton from "../components/Buttons/DeleteProgramButton";
import ExerciseListModalProgram from "./ExerciseListModalProgram";
import { FontAwesome5 } from "@expo/vector-icons";
import FormError from "../components/record-components/FormError";

const EDIT_PROGRAM_MUTATION = gql`
  mutation editProgram(
    $id: Int!
    $title: String!
    $description: String
    $isPublic: Boolean!
  ) {
    editProgram(
      id: $id
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

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const TitleContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 15px;
  padding: 15px 20px;
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
  margin-right: 10px;
  margin-left: 5px;
`;

const ToggleInfoContainer = styled.TouchableOpacity`
  margin-left: 10px;
`;

const ToggleInfoText = styled.Text`
  color: ${(props) => props.theme.mainColor};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SaveProgramButton = styled.TouchableOpacity`
  padding: 12px 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.mainColor};
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
  const { program, exercises } = route.params;
  const [isPublic, setIsPublic] = useState(program.isPublic);
  const [modalVisible, setModalVisible] = useState(false);
  const [isState, setIsState] = useState();

  const toggleSwitch = () => setIsPublic((previousState) => !previousState);

  useEffect(() => {
    const cleanup = () => setIsState(program);
    return () => {
      cleanup();
    };
  }, []);

  const processDefaultValues = (program) => {
    const processWorkoutSets = (workoutSets) => {
      return workoutSets.map((workoutSet) => ({
        exercise: workoutSet.exercise,
        setCount: String(workoutSet.setCount),
        repCount: String(workoutSet.repCount),
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

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues });

  const [workoutIndexState, setWorkoutIndexState] = useState(0);
  const [workoutSetIndexState, setWorkoutSetIndexState] = useState(0);

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
    navigation.navigate("Settings", { screen: "StackSetting" });
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
    refetchQueries: [{ query: ME_QUERY }],
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
        isPublic,
      },
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
                message: "minLength error message",
              },
              maxLength: {
                value: 21,
                message: "maxLength error message",
              },
            }}
            render={({ field: { value } }) => (
              <TitleInput
                defaultValue={defaultValues.programTitle}
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
          <ToggleText>
            Private <FontAwesome5 name="lock" size={14} />
          </ToggleText>
          <Switch
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            onValueChange={toggleSwitch}
            value={isPublic}
          />
          <ToggleText>
            Public <FontAwesome5 name="lock-open" size={14} />
          </ToggleText>
          <ToggleInfoContainer onPress={onClickAlert}>
            <ToggleInfoText>
              <FontAwesome5 name="info-circle" size={18} />
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
            errors,
          }}
        />
        <FormError message={errors?.result?.message} />
        <ButtonContainer>
          <SaveProgramButton
            loading={loading}
            // disabled={!watch("programTitle")}
            onPress={handleSubmit(onSubmitValid)}
          >
            <ButtonText>Save</ButtonText>
          </SaveProgramButton>

          <DeleteProgramButton program={program} {...{ navigation }} />
        </ButtonContainer>

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
