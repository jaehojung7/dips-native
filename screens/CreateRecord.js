import React, { useState } from "react";
import { Modal } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import ExerciseListModalRecord from "./ExerciseListModalRecord";
import ExerciseArray from "../components/create-record/ExerciseArray";
import { ME_QUERY } from "./Program";
import FormError from "../components/record-components/FormError";

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

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 15px;
  padding: 15px 25px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
`;

const RecordTitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
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
    // navigation.navigate("StackProgram");
    navigation.goBack();
    navigation.navigate("Records", { screen: "StackRecord" });
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
        <HeaderContainer>
          <Controller
            name="recordTitle"
            control={control}
            rules={{
              required: "Record title required",
              minLength: {
                value: 4,
                message: "minLength error message",
              },
              maxLength: {
                value: 21,
                message: "maxLength error message",
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <RecordTitleInput
                defaultValue={defaultValues.recordTitle}
                placeholder="Record title"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("recordTitle", text)}
                onChange={clearLoginError}
              />
            )}
          />
        </HeaderContainer>
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

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
