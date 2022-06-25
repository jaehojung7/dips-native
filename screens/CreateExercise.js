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

const CREATE_EXERCISE_MUTATION = gql`
  mutation createExercise($exercise: String!, $bodyPart: String!) {
    createExercise(exercise: $exercise, bodyPart: $bodyPart) {
      ok
      id
      error
    }
  }
`;

const Container = styled.View`
  padding: 10px 15px;
  justify-content: center;
  opacity: 1;
`;

const HeaderContainer = styled.View`
  margin: 10px 0 25px 0;
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

const ExerciseTitle = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  font-size: 21px;
  font-weight: 600;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const Bodypart = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
`;

const Button = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 16px;
  font-weight: 700;
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
        data: newExercise,
        fragment: gql`
          fragment newExerciseFragment on Exercise {
            id
            exercise
            bodyPart
          }
        `,
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

        <Controller
          name="exercise"
          control={control}
          rules={{
            required: "Exercise title required",
            maxLength: {
              value: 24,
              message: "maxLength error message",
            },
          }}
          render={({ onChange, onBlur, value }) => (
            <ExerciseTitle
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
        <FormError message={errors?.exercise?.message} />

        <Bodypart>Select body part</Bodypart>
        <Controller
          name="bodyPart"
          control={control}
          rules={{ required: true }}
          defaultValue="Leg"
          render={({ value }) => (
            <Picker
              itemStyle={{
                height: 150,
                color: scheme === "dark" ? "white" : "black",
                fontSize: 19,
              }}
              // numberOfLines={1}
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
