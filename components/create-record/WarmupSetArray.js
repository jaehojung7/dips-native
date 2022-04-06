import { React, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddSetButton from "./AddSetButton";
import DeleteSetButton from "./DeleteSetButton";

const Container = styled.View`
  margin-top: 10px;
`;

const MainContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const WeightContainer = styled(IndexContainer)`
  width: 40%;
  justify-content: center;
`;

const RepsContainer = styled(IndexContainer)`
  width: 25%;
`;

const SetContainer = styled(IndexContainer)`
  width: 20%;
`;

const SetButton = styled.View`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px;
  border-radius: 5px;
  width: 90%;
`;

const WeightCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 7px 10px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5px;
  width: 70%;
  text-align: center;
`;

const SetCount = styled(WeightCount)`
  width: 100%;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  padding: 0 5px;
`;

const Warmup = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-around;
`;

export default function WarmupSetArray({ workoutIndex, control, setValue }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `workouts[${workoutIndex}].workoutSets`,
  });
  const [isDone, setIsDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isWarmup, setIsWarmup] = useState(false);

  return (
    <Container>
      <MainContainer>
        <SetContainer>
          <IndexText>Set</IndexText>
        </SetContainer>

        <WeightContainer>
          <IndexText>Weight</IndexText>
        </WeightContainer>

        <RepsContainer>
          <IndexText>Reps</IndexText>
        </RepsContainer>
      </MainContainer>

      {fields.map((item, workoutSetIndex) => {
        return (
          <MainContainer key={item.id}>
            <SetContainer>
              <SetButton>
                <Warmup>W</Warmup>
              </SetButton>
            </SetContainer>

            <WeightContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <WeightCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(
                        `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].InputCount`,
                        text
                      )
                    }
                  />
                )}
              />
              <IndexText>kg</IndexText>
            </WeightContainer>

            <RepsContainer>
              <Controller
                name={`workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].InputCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SetCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={2}
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(
                        `workouts[${workoutIndex}].workoutSets[${workoutSetIndex}].setCount`,
                        text
                      )
                    }
                  />
                )}
              />
            </RepsContainer>
          </MainContainer>
        );
      })}
      <ButtonContainer>
        <AddSetButton
          onPress={() => {
            append({});
          }}
        />
        <DeleteSetButton
          onPress={() => {
            remove(fields.length - 1);
          }}
        />
      </ButtonContainer>
    </Container>
  );
}
