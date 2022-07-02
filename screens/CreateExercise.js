import { React, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import { Controller, useForm } from "react-hook-form";
import { useColorScheme, DeviceEventEmitter } from "react-native";
import FormError from "../components/record-components/FormError";
import TextButton from "../components/Buttons/TextButton";
import {
  Container,
  Header,
  HeaderContainer,
  MainContainer,
  TitleContainer,
  TitleInput,
} from "../components/layouts/MainContainer";

const CREATE_EXERCISE_MUTATION = gql`
  mutation createExercise($exercise: String!, $bodyPart: String!) {
    createExercise(exercise: $exercise, bodyPart: $bodyPart) {
      ok
      id
      error
    }
  }
`;

const Bodypart = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export default function CreateExercise({ navigation, route }) {
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [selectedBodyPart, setSelectedBodyPart] = useState("Leg");
  const { userId } = route.params;
  const scheme = useColorScheme();

  const createExerciseUpdate = (cache, result) => {
    const { exercise, bodyPart } = getValues();
    const {
      data: {
        createExercise: { ok, id },
      },
    } = result;

    if (ok) {
      const newExercise = {
        __typename: "Exercise",
        id,
        exercise,
        bodyPart,
      };

      const newExerciseCache = cache.writeFragment({
        fragment: gql`
          fragment newExerciseFragment on Exercise {
            id
            exercise
            bodyPart
          }
        `,
        data: newExercise,
      });

      cache.modify({
        id: `User:${userId}`,
        fields: {
          exercises(prev) {
            return [...prev, newExerciseCache];
          },
        },
      });
    }
  };

  const onCompleted = (data) => {
    const {
      createExercise: { ok, id, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    if (ok) {
      DeviceEventEmitter.emit("event.createExercise", { data });
      navigation.navigate("Settings", { screen: "StackSetting" });
    }
  };

  const [createExerciseFunction, { loading }] = useMutation(
    CREATE_EXERCISE_MUTATION,
    {
      onCompleted,
      update: createExerciseUpdate,
    }
  );

  const onSubmitValid = (submissionData) => {
    const { exercise, bodyPart } = submissionData;
    if (loading) {
      return;
    }
    createExerciseFunction({
      variables: { exercise, bodyPart },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <DismissKeyboard>
      <Container>
        <HeaderContainer>
          <Header>New Exercise</Header>
          <TextButton text="Close" onPress={() => navigation.goBack()} />
        </HeaderContainer>
        <TitleContainer style={{ marginTop: 10 }}>
          <Controller
            name="exercise"
            control={control}
            rules={{
              required: "Exercise title required",
              minLength: {
                value: 3,
                message: "Exercise title length between 3 and 25",
              },
              maxLength: {
                value: 25,
                message: "Exercise title length between 3 and 25",
              },
            }}
            render={({ onChange, onBlur, value }) => (
              <TitleInput
                placeholder="Exercise title"
                autoCapitalize="none"
                returnKeyType="done"
                returnKeyLabel="done"
                placeholderTextColor="#7b7b7b"
                onChangeText={(text) => setValue("exercise", text)}
                onChange={clearLoginError}
              />
            )}
          />
        </TitleContainer>
        <FormError message={errors?.exercise?.message} />

        <MainContainer>
          <Bodypart>Select body part</Bodypart>
          <Controller
            name="bodyPart"
            control={control}
            rules={{ required: true }}
            defaultValue="Leg"
            render={({ value }) => (
              <Picker
                itemStyle={{
                  color: scheme === "dark" ? "white" : "black",
                  fontSize: 18,
                  fontWeight: "600",
                }}
                selectedValue={selectedBodyPart}
                onValueChange={(itemValue) => {
                  setValue("bodyPart", itemValue);
                  setSelectedBodyPart(itemValue);
                }}
              >
                <Picker.Item label="Leg" value="Leg" />
                <Picker.Item label="Back" value="Back" />
                <Picker.Item label="Chest" value="Chest" />
                <Picker.Item label="Shoulder" value="Shoulder" />
                <Picker.Item label="Core" value="Core" />
                <Picker.Item label="Arm" value="Arm" />
              </Picker>
            )}
          />
        </MainContainer>

        <FormError message={errors?.result?.message} />
        <MainButton
          text="Add exercise"
          disabled={false}
          loading={loading}
          onPress={handleSubmit(onSubmitValid)}
        />
      </Container>
    </DismissKeyboard>
  );
}
