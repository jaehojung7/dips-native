import { React } from "react";
import { View } from "react-native";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddSetButton from "./AddSetButton";
import DeleteSetButton from "./DeleteSetButton";
import {
  ArrayContainer,
  IndexContainer,
  IndexText,
  InputCount,
} from "../layouts/ArrayLayout";

const SetButton = styled.View`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px;
  border-radius: 5px;
  width: 90%;
`;

const Mainset = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
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
    <View style={{ marginTop: 10 }}>
      <ArrayContainer>
        <IndexContainer style={{ width: "20%" }}>
          <IndexText>Set</IndexText>
        </IndexContainer>

        <IndexContainer style={{ width: "50%" }}>
          <IndexText>Weight</IndexText>
        </IndexContainer>

        <IndexContainer style={{ width: "25%" }}>
          <IndexText>Reps</IndexText>
        </IndexContainer>
      </ArrayContainer>

      {fields.map((recordExerciseSet, recordExerciseSetIndex) => {
        return (
          <ArrayContainer key={recordExerciseSet.id}>
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
                  <InputCount
                    style={{ width: "65%" }}
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
                  <InputCount
                    style={{ width: "90%" }}
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
          </ArrayContainer>
        );
      })}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
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
      </View>
    </View>
  );
}
