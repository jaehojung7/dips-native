import { React, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import AddTemplateSetButton from "./AddTemplateSetButton";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SetModal from "../modal-components/SetModal";
import { Modal } from "react-native";

const TemplateSetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const SetContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.lightgray};
  padding: 3px;
  border-radius: 15px;
  width: 25px;
`;

const IconContainer = styled.TouchableOpacity``;

const SetNumber = styled.Text`
  color: black;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
`;

const InputCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.lightgray};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  width: 50px;
  text-align: center;
`;

const CheckContainer = styled.TouchableOpacity``;

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
  const [isDone, setIsDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isWarmup, setIsWarmup] = useState(false);
  const [isDropset, setIsDropset] = useState(false);

  // const SetOptions = () => {
  //   const [isWarmup, setIsWarmup] = useState(false);
  //   const [isDropset, setIsDropset] = useState(false);
  //   if (isWarmup) {
  //     return (
  //       <IconContainer
  //         onPress={() => {
  //           setModalVisible(true);
  //         }}
  //       >
  //         <FontAwesome5 name="arrow-circle-up" size={23} color="#FF7F50" />
  //       </IconContainer>
  //     );
  //   }
  //   if (isDropset) {
  //     return (
  //       <IconContainer
  //         onPress={() => {
  //           setModalVisible(true);
  //         }}
  //       >
  //         <FontAwesome5 name="arrow-circle-down" size={23} color="#42a5f5" />
  //       </IconContainer>
  //     );
  //   } else {
  //   }
  // };

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
        <IndexText>세트</IndexText>
        <IndexText>중량(kg)</IndexText>
        <IndexText>Reps</IndexText>
        <IndexText>RIR</IndexText>
        <FontAwesome5 name="check-circle" size={19} color="#797d7f" />
      </IndexContainer>

      {fields.map((item, templateSetIndex) => {
        return (
          <Swipeable
            key={item.id}
            templateSetIndex={templateSetIndex}
            renderRightActions={renderRightActions}
          >
            <TemplateSetContainer>
              {isWarmup ? (
                <IconContainer
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <FontAwesome5
                    name="arrow-circle-up"
                    size={23}
                    color="#FF7F50"
                  />
                </IconContainer>
              ) : isDropset ? (
                <IconContainer
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <FontAwesome5
                    name="arrow-circle-down"
                    size={23}
                    color="#42a5f5"
                  />
                </IconContainer>
              ) : (
                <SetContainer
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <SetNumber>{parseInt(`${templateSetIndex}`) + 1}</SetNumber>
                </SetContainer>
              )}

              <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
              >
                <SetModal {...{ setModalVisible, setIsWarmup, setIsDropset }} />
              </Modal>

              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#797d7f"
                    onChangeText={(text) =>
                      setValue(
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].InputCount`,
                        text
                      )
                    }
                  />
                )}
              />
              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].InputCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
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
                  <InputCount
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
                  <FontAwesome5 name="check-circle" size={19} color="#32CD32" />
                ) : (
                  <FontAwesome5 name="check-circle" size={19} color="#797d7f" />
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
