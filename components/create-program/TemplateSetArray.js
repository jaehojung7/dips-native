import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateSetButton from "../Buttons/AddTemplateSetButton";
import Swipeable from "react-native-gesture-handler/Swipeable";

const TemplateSetContainer = styled.View`
  flex-direction: row;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* margin-bottom: 10px; */
`;

const ExerciseTitle = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  border: 1px solid ${(props) => props.theme.gray};
  /* border: 1px solid #999999; */
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 20px;
  margin-bottom: 10px;
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
                    placeholder="운동이름"
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].exercise`,
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
