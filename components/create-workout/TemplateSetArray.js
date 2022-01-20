import { React, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateSetButton from "./AddTemplateSetButton";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SetModal from "../modal-components/SetModal";
import { Modal } from "react-native";

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  /* padding: 0 3px; */
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const SetContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
`;

const SetNumber = styled.Text`
  color: black;
  font-weight: 700;
`;

const TemplateSetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SetCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  width: 60px;
`;

const CheckContainer = styled.TouchableOpacity``;

const Button = styled.TouchableOpacity`
  /* background-color: tomato; */
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;

const ButtonText = styled.Text`
  color: tomato;
  font-size: 12px;
  font-weight: 700;
  /* margin: 0 5px; */
  text-align: center;
`;

export default function TemplateSetArray({ templateIndex, control, setValue }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `templates[${templateIndex}].templateSets`,
  });
  const [isDone, setIsDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const renderRightActions = (progress, dragX, templateSetIndex) => {
    const trans = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Button onPress={() => remove(templateSetIndex)}>
        <ButtonText>Delete</ButtonText>
      </Button>
    );
  };

  return (
    <>
      <IndexContainer>
        <IndexText>Set</IndexText>
        <IndexText>Load (kg)</IndexText>
        <IndexText>Reps</IndexText>
        <IndexText>RIR</IndexText>
        <FontAwesome5 name="check-circle" size={18} color="#797d7f" />
      </IndexContainer>

      {fields.map((item, templateSetIndex) => {
        return (
          <Swipeable
            key={item.id}
            templateSetIndex={templateSetIndex}
            renderRightActions={renderRightActions}
          >
            <TemplateSetContainer>
              <SetContainer
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <SetNumber>{parseInt(`${templateSetIndex}`) + 1}</SetNumber>
                <Modal
                  animationType="none"
                  transparent={true}
                  visible={modalVisible}
                >
                  <SetModal {...{ setModalVisible }} />
                </Modal>
              </SetContainer>

              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SetCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={4}
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
              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SetCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
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

              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SetCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
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
              <CheckContainer onPress={() => setIsDone(!isDone)}>
                {isDone ? (
                  <FontAwesome5 name="check-circle" size={18} color="#32CD32" />
                ) : (
                  <FontAwesome5 name="check-circle" size={18} color="#797d7f" />
                )}
              </CheckContainer>
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
