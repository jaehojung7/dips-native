import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import WorkoutSetArray from "./WorkoutSetArray";
import AddDeleteWorkoutButton from "../Buttons/AddDeleteWorkoutButton";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0 15px 0;
`;

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const ContainerTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
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
  /* justify-content: space-evenly; */
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

export default function WorkoutArray({
  program,
  control,
  setValue,
  setWorkoutIndexState,
  setWorkoutSetIndexState,
  setModalVisible,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });

  return (
    <>
      {program ? (
        <>
          {program?.workouts.map((workout, workoutIndex) => {
            return (
              <WorkoutContainer key={workoutIndex}>
                <Controller
                  name="workoutTitle"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <WorkoutTitle
                      // value={watch("workoutTitle")}
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
                              defaultValue={
                                workoutSet ? workoutSet.exercise : ""
                              }
                              // value={watch("exerciseTitle")}
                              placeholder="운동 이름"
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
                        <Controller
                          name="exerciseSets"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value } }) => (
                            <SetbyRep
                              defaultValue={workoutSet.setCount.toString()}
                              // value={watch("exerciseSets")}
                              keyboardType="numeric"
                              type="number"
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
                          render={({ field: { value } }) => (
                            <SetbyRep
                              defaultValue={workoutSet.repCount.toString()}
                              keyboardType="numeric"
                              type="number"
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
        </>
      ) : (
        <>
          {fields.map((workout, workoutIndex) => {
            return (
              <MainContainer key={workout.id}>
                <TitleContainer>
                  <Controller
                    name={`workouts[${workoutIndex}].name`}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <ContainerTitle
                        defaultValues={workout.title}
                        placeholder="워크아웃 이름"
                        placeholderTextColor="#999999"
                        onChangeText={(text) =>
                          setValue(`workouts[${workoutIndex}].name`, text)
                        }
                      />
                    )}
                  />
                </TitleContainer>
                <BorderLine />
                <WorkoutSetArray
                  workoutIndex={workoutIndex}
                  {...{
                    control,
                    setValue,
                    setWorkoutIndexState,
                    setWorkoutSetIndexState,
                    setModalVisible,
                  }}
                />
              </MainContainer>
            );
          })}
        </>
      )}

      <AddDeleteWorkoutButton
        text="워크아웃 추가"
        onPress={() => {
          append({});
        }}
      />
      <AddDeleteWorkoutButton
        text="워크아웃 삭제"
        onPress={() => {
          remove(fields.length - 1);
        }}
      />
    </>
  );
}
