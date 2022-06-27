import React, { useState, useEffect } from "react";
import { Modal, DeviceEventEmitter } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import ExerciseListModalRecord from "./ExerciseListModalRecord";
import ExerciseArray from "../components/create-record/ExerciseArray";
import { ME_QUERY } from "./Program";
import DeleteRecordButton from "../components/Buttons/DeleteRecordButton";
import FormError from "../components/record-components/FormError";
import {
  Container,
  TitleContainer,
  TitleInput,
} from "../components/layouts/MainContainer";
import DismissKeyboard from "../components/DismissKeyboard";

const EDIT_RECORD_MUTATION = gql`
  mutation editRecord($id: Int!, $title: String!, $description: String) {
    editRecord(id: $id, title: $title, description: $description) {
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

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 2px 0;
`;

const SaveRecordButton = styled.TouchableOpacity`
  padding: 12px;
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

export default function EditRecord({ navigation, route }) {
  const { record, exercises } = route.params;
  const [isState, setIsState] = useState();
  const successMessage = "Record edited. Please pull to refresh.";

  useEffect(() => {
    const cleanup = () => setIsState(record);
    return () => {
      cleanup();
    };
  }, []);

  const processDefaultValues = (record) => {
    const processRecordExerciseSets = (recordExerciseSets) => {
      return recordExerciseSets.map((recordExerciseSet) => ({
        weight: String(recordExerciseSet.weight),
        repCount: String(recordExerciseSet.repCount),
      }));
    };

    const processRecordExercises = (recordExercises) => {
      return recordExercises.map((recordExercise) => ({
        exercise: recordExercise.exercise,
        recordExerciseSets: processRecordExerciseSets(
          recordExercise.recordExerciseSets
        ),
      }));
    };

    return {
      recordTitle: record.title,
      recordExercises: processRecordExercises(record?.recordExercises),
    };
  };

  const defaultValues = processDefaultValues(record);

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

  const onEditRecordCompleted = (data) => {
    const {
      editRecord: { ok, id: recordId, error },
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
    DeviceEventEmitter.emit("event.editRecord", { data });
    navigation.navigate("StackRecord", { successMessage });
  };

  const [editRecordFunction, { loading, error }] = useMutation(
    EDIT_RECORD_MUTATION,
    {
      onCompleted: onEditRecordCompleted,
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
    editRecordFunction({
      variables: {
        id: record.id,
        title: recordTitle,
        description,
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
                message: "Record title length between 5 and 30",
              },
              maxLength: {
                value: 30,
                message: "Record title length between 5 and 30",
              },
            }}
            render={({ field: { value } }) => (
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
            defaultValues,
            setRecordExerciseIndexState,
            setModalVisible,
            errors,
          }}
        />
        <FormError message={errors?.result?.message} />
        <ButtonContainer>
          <SaveRecordButton
            loading={loading}
            disabled={!watch("recordTitle")}
            onPress={handleSubmit(onSubmitValid)}
          >
            <ButtonText>Save</ButtonText>
          </SaveRecordButton>

          <DeleteRecordButton record={record} {...{ navigation }} />
        </ButtonContainer>

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
