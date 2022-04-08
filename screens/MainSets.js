import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import WorkoutButton from "../components/Buttons/WorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import ExerciseArray from "../components/create-record/ExerciseArray";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const ButtonContainer = styled.View`
  padding: 0 15px;
`;

const HeaderContainer = styled.View`
  margin: 0px 15px 15px 15px;
`;

const WorkoutTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
`;

const WorkoutTitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
`;

// const CREATE_RECORD_MUTATION = gql``;

// const CREATE_RECORD_EXERCISE_MUTATION = gql``;

// const CREATE_RECORD_EXERCISE_SET_MUTATION = gql``;

// Passing empty strings as default values creates one empty form automatically
const defaultValues = {
  exercises: [
    {
      name: "",
      exerciseSets: [{}],
    },
  ],
};

export default function MainSets({ route }) {
  let { workout } = route?.params;
  if (workout === undefined) {
    workout = {};
  }

  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({
      defaultValues,
    });

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { recordTitle } = getValues();
    // createProgramFunction({
    //   variables: { title: programTitle, description },
    // });
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Controller
            name="recordTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <WorkoutTitleInput
                placeholder="워크아웃 제목"
                defaultValue={workout ? workout.title : ""}
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("recordTitle", text)}
              />
            )}
          />
        </HeaderContainer>

        <ExerciseArray
          {...{
            control,
            setValue,
          }}
        />

        <ButtonContainer>
          <WorkoutButton
            text="워크아웃 기록 저장"
            // loading={loading}
            disabled={!watch("recordTitle")}
            onPress={handleSubmit(onSubmitValid)}
          />
        </ButtonContainer>
      </Container>
    </DismissKeyboard>
  );
}
