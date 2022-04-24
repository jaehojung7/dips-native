import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import AddDeleteWorkoutButton from "../components/Buttons/AddDeleteWorkoutButton";

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
    $exercise: String
    $setCount: Int!
    $repCount: Int
  ) {
    createWorkoutSet(
      programId: $programId
      workoutIndex: $workoutIndex
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

const HeaderContainer = styled.View`
  margin: 50px 15px 15px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProgramTitle = styled.TextInput`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const WorkoutContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 25px;
`;

const WorkoutTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.fontColor};
`;

const ExerciseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ExerciseTitleContainer = styled.View`
  width: 50%;
  border: 1px solid blue;
`;

const ExerciseTitle = styled.TextInput`
  font-size: 17px;
  font-weight: 500;
  color: ${(props) => props.theme.fontColor};
`;

const SetbyRepContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid black;
  width: 40%;
`;

const SetbyRep = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5px;
  text-align: center;
  width: 40%;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  font-weight: 500;
  margin: 0 5px;
`;

// Passing empty strings as default values creates one empty form automatically
const defaultValues = {
  workouts: [
    {
      name: "",
      workoutSets: [{}],
    },
  ],
};

export default function EditProgram({ route }) {
  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({
      defaultValues,
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });
  const { program } = route.params;
  const [isPrivate, setIsPrivate] = useState(false);

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
    submissionData.workouts[workoutIndex].workoutSets.map((workoutSet) => {
      createWorkoutSetFunction({
        variables: {
          programId,
          workoutIndex,
          exercise: workoutSet.exercise,
          setCount: parseInt(workoutSet.setCount),
          repCount: parseInt(workoutSet.repCount),
        },
      });
    });
  };

  const onEditProgramCompleted = (data) => {
    console.log("onEditProgramCompleted");
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
        variables: { programId, workoutIndex, title: workout.name },
      });
    });
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
        <HeaderContainer>
          <Controller
            name="programTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ProgramTitle
                placeholder="프로그램 이름"
                defaultValue={program.title}
                autoCapitalize="none"
                returnKeyType="next"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("programTitle", text)}
              />
            )}
          />
        </HeaderContainer>

        {program?.workouts.map((workout, workoutIndex) => {
          return (
            <WorkoutContainer key={workoutIndex}>
              <Controller
                name="workoutTitle"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <WorkoutTitle
                    placeholder="워크아웃 이름"
                    defaultValue={workout.title}
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor="#999999"
                    onChangeText={(text) => setValue("workoutTitle", text)}
                  />
                )}
              />

              {workout?.workoutSets.map((workoutSet, workoutSetIndex) => {
                return (
                  <ExerciseContainer key={workoutSetIndex}>
                    <ExerciseTitleContainer>
                      <Controller
                        name="exerciseTitle"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value } }) => (
                          <ExerciseTitle
                            placeholder="운동 이름"
                            defaultValue={workoutSet ? workoutSet.exercise : ""}
                            autoCapitalize="none"
                            returnKeyType="next"
                            placeholderTextColor="#999999"
                            onChangeText={(text) =>
                              setValue("exerciseTitle", text)
                            }
                          />
                        )}
                      />
                    </ExerciseTitleContainer>

                    <SetbyRepContainer>
                      {/* <ExerciseTitle>{workoutSet.setCount}</ExerciseTitle> */}
                      <Controller
                        name="exerciseSets"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <SetbyRep
                            keyboardType="numeric"
                            type="number"
                            defaultValue={workoutSet.setCount.toString()}
                            maxLength={3}
                            placeholderTextColor="#999999"
                            onChangeText={(text) =>
                              setValue("exerciseSets", text)
                            }
                          />
                        )}
                      />
                      <IndexText>x</IndexText>
                      <Controller
                        name="exerciseReps"
                        control={control}
                        // rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <SetbyRep
                            keyboardType="numeric"
                            type="number"
                            // placeholder={workoutSet.repCount}
                            defaultValue={workoutSet.repCount.toString()}
                            maxLength={3}
                            placeholderTextColor="#999999"
                            onChangeText={(text) =>
                              setValue("exerciseReps", text)
                            }
                          />
                        )}
                      />
                    </SetbyRepContainer>
                  </ExerciseContainer>
                );
              })}
            </WorkoutContainer>
          );
        })}
        <AddDeleteWorkoutButton
          text="워크아웃 추가"
          onPress={() => {
            console.log("Button pressed");
            append({});
          }}
        />
        <AddDeleteWorkoutButton
          text="워크아웃 삭제"
          onPress={() => {
            remove(fields.length - 1);
          }}
        />
        <MainButton
          text="새 프로그램 저장"
          loading={loading}
          // disabled={!watch("programTitle")}
          onPress={handleSubmit(onSubmitValid)}
        />
      </Container>
    </DismissKeyboard>
  );
}
