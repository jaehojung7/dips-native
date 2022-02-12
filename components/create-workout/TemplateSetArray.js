import { React, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SetModal from "../modal-components/SetModal";
import { Modal } from "react-native";
import AddSetButton from "./AddSetButton";
import DeleteSetButton from "./DeleteSetButton";

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

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const SetContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px;
  border-radius: 5px;
  width: 30px;
`;

const Mainset = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const Warmup = styled.Text`
  color: ${(props) => props.theme.orange};
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const Dropset = styled.Text`
  color: ${(props) => props.theme.blue};
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const InputCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 7px 10px;
  font-size: 15px;
  border-radius: 5px;
  width: 70px;
  text-align: center;
`;

const CheckContainer = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-around;
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

  return (
    <>
      <IndexContainer>
        <IndexText>Set</IndexText>
        <IndexText>Load (kg)</IndexText>
        <IndexText>Reps</IndexText>
        <FontAwesome5 name="check-circle" size={20} color="#999999" />
      </IndexContainer>

      {fields.map((item, templateSetIndex) => {
        return (
          <TemplateSetContainer key={item.id}>
            {isWarmup ? (
              <SetContainer
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Warmup>W</Warmup>
              </SetContainer>
            ) : isDropset ? (
              <SetContainer
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Dropset>D</Dropset>
              </SetContainer>
            ) : (
              <SetContainer
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Mainset>{parseInt(`${templateSetIndex}`) + 1}</Mainset>
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
                  placeholderTextColor="#999999"
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
                  placeholderTextColor="#999999"
                  onChangeText={(text) =>
                    setValue(
                      `templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`,
                      text
                    )
                  }
                />
              )}
            />

            {/* <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCount
                    keyboardType="numeric"
                    type="number"
                    placeholder="0"
                    maxLength={3}
                    placeholderTextColor="#999999"
                    onChangeText={(text) =>
                      setValue(
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`,
                        text
                      )
                    }
                  />
                )}
              /> */}
            <CheckContainer onPress={() => setIsDone(!isDone)}>
              {isDone ? (
                <FontAwesome5 name="check-circle" size={20} color="#32CD32" />
              ) : (
                <FontAwesome5 name="check-circle" size={20} color="#999999" />
              )}
            </CheckContainer>
          </TemplateSetContainer>
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
            remove({});
          }}
        />
      </ButtonContainer>
    </>
  );
}
