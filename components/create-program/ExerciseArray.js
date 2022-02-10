import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AddDeleteExerciseButton from "../Buttons/AddDeleteExerciseButton";

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0;
`;

const TemplateSetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const IndexContainer = styled.View`
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
  margin: 20px 0;
`;

const SetByReps = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between;
  margin: 20px 0; */
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  margin: 0 5px;
`;

const ExerciseTitle = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 5px;
  /* margin-bottom: 10px; */
`;

const InputCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  border-radius: 5px;
  width: 40px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-evenly;
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

export default function ExerciseArray({ templateIndex, control, setValue }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `templates[${templateIndex}].templateSets`,
  });

  const renderRightActions = (progress, dragX, templateSetIndex) => {
    const trans = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Button onPress={() => remove(templateSetIndex)}>
        <ButtonText>지우기</ButtonText>
      </Button>
    );
  };

  return (
    <>
      <IndexContainer>
        <IndexText>Exercise</IndexText>
        <IndexText>Set x Reps</IndexText>
      </IndexContainer>

      {fields.map((item, templateSetIndex) => {
        return (
          <Swipeable
            key={item.id}
            templateSetIndex={templateSetIndex}
            renderRightActions={renderRightActions}
          >
            <TemplateSetContainer key={item.id}>
              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].exercise`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ExerciseTitle
                    placeholder="운동 고르기"
                    placeholderTextColor="#7b7b7b"
                    onChangeText={(text) =>
                      setValue(
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].exercise`,
                        text
                      )
                    }
                  />
                )}
              />
              <SetByReps>
                <Controller
                  name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
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
                          `templates[${templateIndex}].templateSets[${templateSetIndex}].InputCount`,
                          text
                        )
                      }
                    />
                  )}
                />
                <IndexText>x</IndexText>
                <Controller
                  name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
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
                          `templates[${templateIndex}].templateSets[${templateSetIndex}].InputCount`,
                          text
                        )
                      }
                    />
                  )}
                />
              </SetByReps>
            </TemplateSetContainer>
            {/* <BorderLine /> */}
          </Swipeable>
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
            remove({});
          }}
        />
      </ButtonContainer>
    </>
  );
}
