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
  border: 1.5px solid
    ${(props) =>
      props.hasError ? props.theme.mainColor : props.theme.inputBackground};
`;

const RepCount = styled(WeightCount)`
  width: 100%;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  padding: 0 5px;
`;

const Mainset = styled.Text`
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

export default function ExerciseSetArray({
  recordExerciseIndex,
  control,
  setValue,
  errors,
  defaultValues,
}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `recordExercises[${recordExerciseIndex}].recordExerciseSets`,
  });

  return (
    <Container>
      <MainContainer>
        <IndexContainer style={{ width: "20%" }}>
          <IndexText>Set</IndexText>
        </IndexContainer>

        <IndexContainer style={{ width: "50%" }}>
          <IndexText>Weight</IndexText>
        </IndexContainer>

        <IndexContainer style={{ width: "25%" }}>
          <IndexText>Reps</IndexText>
        </IndexContainer>
      </MainContainer>

      {fields.map((recordExerciseSet, recordExerciseSetIndex) => {
        return (
          <MainContainer key={recordExerciseSet.id}>
            <IndexContainer style={{ width: "20%" }}>
              <SetButton>
                <Mainset>{parseInt(`${recordExerciseSetIndex}`) + 1}</Mainset>
              </SetButton>
            </IndexContainer>

            <IndexContainer style={{ width: "50%" }}>
              <Controller
                name={`recordExercises[${recordExerciseIndex}].recordExerciseSets[${recordExerciseSetIndex}].weight`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <WeightCount
                    defaultValue={
                      defaultValues?.recordExercises[recordExerciseIndex]
                        ?.recordExerciseSets[recordExerciseSetIndex]?.weight
                    }
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={6}
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(
                        `recordExercises[${recordExerciseIndex}].recordExerciseSets[${recordExerciseSetIndex}].weight`,
                        text
                      )
                    }
                    hasError={Boolean(
                      errors?.recordExercises?.[recordExerciseIndex]
                        ?.recordExerciseSets?.[recordExerciseSetIndex]?.weight
                    )}
                  />
                )}
              />
              <IndexText>kg</IndexText>
            </IndexContainer>

            <IndexContainer style={{ width: "25%" }}>
              <Controller
                name={`recordExercises[${recordExerciseIndex}].recordExerciseSets[${recordExerciseSetIndex}].repCount`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <RepCount
                    defaultValue={
                      defaultValues?.recordExercises[recordExerciseIndex]
                        ?.recordExerciseSets[recordExerciseSetIndex]?.repCount
                    }
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(
                        `recordExercises[${recordExerciseIndex}].recordExerciseSets[${recordExerciseSetIndex}].repCount`,
                        text
                      )
                    }
                    hasError={Boolean(
                      errors?.recordExercises?.[recordExerciseIndex]
                        ?.recordExerciseSets?.[recordExerciseSetIndex]?.repCount
                    )}
                  />
                )}
              />
            </IndexContainer>
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
