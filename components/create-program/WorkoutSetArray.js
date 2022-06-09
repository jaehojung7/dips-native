import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";

const Container = styled.View`
  /* padding: 0 5px; */
`;

const MainContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SubContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  font-weight: 500;
  margin: 0 5px;
`;

const SetsReps = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  width: 30%;
`;

const SelectExercise = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  width: 100%;
`;

const ExerciseTitle = styled.Text`
  color: black;
  font-size: 15px;
  text-align: center;
`;

const InputCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  width: 30%;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-around;
`;

export default function WorkoutSetArray({
  workoutIndex,
  control,
  setValue,
  defaultValues,
  setWorkoutIndexState,
  setWorkoutSetIndexState,
  setModalVisible,
}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `workouts[${workoutIndex}].workoutSets`,
  });

  return (
    <Container>
      <MainContainer>
        <SubContainer>
          <IndexText>Exercise</IndexText>
        </SubContainer>

        <SubContainer>
          <SetsReps>Sets</SetsReps>
          <IndexText>x</IndexText>
          <SetsReps>Reps</SetsReps>
        </SubContainer>
      </MainContainer>

      {fields.map((workoutSet, workoutSetIndex) => {
        return (
          <MainContainer key={workoutSet.id}>
            <SubContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].exercise`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <SelectExercise
                    onPress={() => {
                      setWorkoutIndexState(workoutIndex);
                      setWorkoutSetIndexState(workoutSetIndex);
                      setModalVisible(true);
                    }}
                  >
                    <ExerciseTitle>{value ? value : "Select"}</ExerciseTitle>
                  </SelectExercise>
                )}
              />
            </SubContainer>
            <SubContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].setCount`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
                    defaultValue={
                      defaultValues?.workouts[workoutIndex]?.workoutSets[
                        workoutSetIndex
                      ]?.setCount
                    }
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#7b7b7b"
                    onChangeText={(text) =>
                      setValue(
                        `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].setCount`,
                        text
                      )
                    }
                  />
                )}
              />
              <IndexText>x</IndexText>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].repCount`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
                    defaultValue={
                      defaultValues?.workouts[workoutIndex]?.workoutSets[
                        workoutSetIndex
                      ]?.repCount
                    }
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#7b7b7b"
                    onChangeText={(text) =>
                      setValue(
                        `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].repCount`,
                        text
                      )
                    }
                  />
                )}
              />
            </SubContainer>
          </MainContainer>
        );
      })}
      <ButtonContainer>
        <AddDeleteExerciseButton
          text="Add exercise"
          onPress={() => {
            append({});
          }}
        />
        <AddDeleteExerciseButton
          text="Delete exercise"
          onPress={() => {
            remove(fields.length - 1);
          }}
        />
      </ButtonContainer>
    </Container>
  );
}
