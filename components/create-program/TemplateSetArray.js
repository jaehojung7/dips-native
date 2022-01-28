import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateSetButton from "../Buttons/AddTemplateSetButton";
import Swipeable from "react-native-gesture-handler/Swipeable";

const TemplateSetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px 10px;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const ExerciseTitle = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  /* width: 75%; */
`;

const SetCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  /* width: 15%; */
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

export default function TemplateSetArray({ templateIndex, control, setValue }) {
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
        <IndexText>운동이름</IndexText>
        <IndexText>Set</IndexText>
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
                    placeholder="운동 선택하기"
                    placeholderTextColor="#797d7f"
                    onChangeText={(text) =>
                      setValue(
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].exercise`,
                        text
                      )
                    }
                  />
                )}
              />
              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SetCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    placeholderTextColor="#797d7f"
                    onChangeText={(text) =>
                      setValue(
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`,
                        text
                      )
                    }
                  />
                )}
              />
            </TemplateSetContainer>
          </Swipeable>
        );
      })}

      <AddTemplateSetButton
        onPress={() => {
          append({});
        }}
      />
    </>
  );
}
