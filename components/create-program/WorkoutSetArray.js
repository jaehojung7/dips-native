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
  /* border: 1px solid ${(props) => props.theme.inputBackground}; */
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  width: 30%;
`;

const ExerciseTitle = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  width: 100%;
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

const Button = styled.TouchableOpacity`
  margin-left: 13px;
  justify-content: center;
  margin-top: -15px;
`;

const ButtonText = styled.Text`
  color: tomato;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

export default function WorkoutSetArray({ workoutIndex, control, setValue }) {
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

      {fields.map((item, workoutSetIndex) => {
        return (
          <MainContainer key={item.id}>
            <SubContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].exercise`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ExerciseTitle
                    placeholder="운동 고르기"
                    placeholderTextColor="#7b7b7b"
                    onChangeText={(text) =>
                      setValue(
                        `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].exercise`,
                        text
                      )
                    }
                  />
                )}
              />
            </SubContainer>
            <SubContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
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
          text="운동 추가"
          onPress={() => {
            append({});
          }}
        />
        <AddDeleteExerciseButton
          text="운동 삭제"
          onPress={() => {
            remove(fields.length - 1);
          }}
        />
      </ButtonContainer>
    </Container>
  );
}