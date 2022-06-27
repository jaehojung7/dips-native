import React, { useState } from "react";
import { Modal, DeviceEventEmitter, ScrollView } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import MainButton from "../components/Buttons/MainButton";
import ExerciseListModalRecord from "./ExerciseListModalRecord";
import ExerciseArray from "../components/create-record/ExerciseArray";
import { ME_QUERY } from "./Program";
import FormError from "../components/record-components/FormError";
import {
  Container,
  TitleContainer,
  TitleInput,
} from "../components/layouts/MainContainer";
import DismissKeyboard from "../components/DismissKeyboard";

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
  mutation createRecordExercise(
    $recordId: Int!
    $recordExerciseIndex: Int!
    $exercise: String!
  ) {
    createRecordExercise(
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
  mutation createRecordExerciseSet(
    $recordId: Int!
    $recordExerciseIndex: Int!
    $recordExerciseSetIndex: Int!
    $weight: Int!
    $repCount: Int!
  ) {
    createRecordExerciseSet(
      recordId: $recordId
      recordExerciseIndex: $recordExerciseIndex
      recordExerciseSetIndex: $recordExerciseSetIndex
      weight: $weight
      repCount: $repCount
    ) {
      ok
      id
      error
    }
  }
`;

export default function CreateRecord({ navigation, route }) {
  const { baseProgramId } = route.params;
  const { programTitle } = route.params;
  let { workout } = route.params;
  if (workout === undefined) {
    workout = {
      title: "",
      workoutSets: [
        {
          exercise: "",
          setCount: 1,
          repCount: "",
        },
      ],
    };
  }
  const { exercises } = route.params;
  const successMessage = "Record created. Please pull to refresh.";

  const processDefaultValues = (programTitle, workout) => {
    // https://stackoverflow.com/questions/12503146/create-an-array-with-same-element-repeated-multiple-times
    const processRecordExercises = (workoutSets) => {
      return workoutSets.map((workoutSet) => ({
        exercise: workoutSet.exercise,
        recordExerciseSets: Array(workoutSet.setCount).fill({
          weight: "",
          repCount: String(workoutSet.repCount),
        }),
      }));
    };

    return {
      recordTitle: programTitle
        ? `${programTitle} > ${workout.title}`
        : `New workout`,
      recordExercises: processRecordExercises(workout?.workoutSets),
    };
  };

  const defaultValues = processDefaultValues(programTitle, workout);

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

  const [recordExerciseIndexState, setRecordExerciseIndexState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const onCreateRecordExerciseSetCompleted = (data) => {
    const {
      createRecordExerciseSet: { ok, id: recordExerciseSetId, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  const onCreateRecordExerciseCompleted = (data) => {
    const {
      createRecordExercise: { ok, recordId, recordExerciseIndex, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }

    const submissionData = getValues();
    submissionData.recordExercises[recordExerciseIndex].recordExerciseSets.map(
      (recordExerciseSet, recordExerciseSetIndex) => {
        createRecordExerciseSetFunction({
          variables: {
            recordId,
            recordExerciseIndex,
            recordExerciseSetIndex,
            weight: parseInt(recordExerciseSet.weight),
            repCount: parseInt(recordExerciseSet.repCount),
          },
        });
      }
    );
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
    submissionData.recordExercises.map(
      (recordExercise, recordExerciseIndex) => {
        createRecordExerciseFunction({
          variables: {
            recordId,
            recordExerciseIndex,
            exercise: recordExercise.exercise,
          },
        });
      }
    );
    DeviceEventEmitter.emit("event.createRecord", { data });
    navigation.goBack();
    navigation.navigate("Records", {
      screen: "StackRecord",
      params: { successMessage },
    });
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

  const [createRecordExerciseSetFunction] = useMutation(
    CREATE_RECORD_EXERCISE_SET_MUTATION,
    {
      onCompleted: onCreateRecordExerciseSetCompleted,
      // Creating a new program object directly in Apollo cache is probably better
      refetchQueries: [{ query: ME_QUERY }],
    }
  );

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { recordTitle, description } = getValues();
    createRecordFunction({
      variables: {
        title: recordTitle,
        description,
        baseProgramId,
        baseWorkoutIndex: workout?.workoutIndex,
      },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <TitleContainer>
          <Controller
            name="recordTitle"
            control={control}
            rules={{
              required: "Record title required",
              minLength: {
                value: 5,
                message: "Record title length longer than 5",
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TitleInput
                defaultValue={defaultValues.recordTitle}
                placeholder="Record title"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("recordTitle", text)}
                onChange={clearLoginError}
              />
            )}
          />
        </TitleContainer>
        <FormError message={errors?.recordTitle?.message} />

        <ExerciseArray
          {...{
            control,
            setValue,
            errors,
            defaultValues,
            setRecordExerciseIndexState,
            setModalVisible,
            errors,
          }}
        />
        <FormError message={errors?.result?.message} />
        <MainButton
          text="Save workout"
          loading={loading}
          disabled={!watch("recordTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />

        <Modal
          presentationStyle="pageSheet"
          animationType="slide"
          visible={modalVisible}
        >
          <ExerciseListModalRecord
            {...{
              exercises,
              setModalVisible,
              recordExerciseIndexState,
              setValue,
            }}
          />
        </Modal>
      </Container>
    </DismissKeyboard>
  );
}
