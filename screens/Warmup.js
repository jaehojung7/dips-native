import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import WarmupArray from "../components/create-record/WarmupArray";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 0px 15px 15px 15px;
`;

const WorkoutTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
`;

// Passing empty strings as default values creates one empty form automatically
const defaultValues = {
  workouts: [
    {
      name: "",
      workoutSets: [{ exercise: "", setCount: "" }],
    },
  ],
};

export default function Warmup({ route }) {
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
    const { programTitle, description } = getValues();
    createProgramFunction({
      variables: { title: programTitle, description },
    });
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <WorkoutTitle>웜업 세트</WorkoutTitle>
        </HeaderContainer>
        <WarmupArray
          {...{
            control,
            setValue,
          }}
          workout={workout}
        />
      </Container>
    </DismissKeyboard>
  );
}
