import { React, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SetModal from "../modal-components/SetModal";
import { Modal } from "react-native";
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
  width: 35%;
  justify-content: center;
`;

const RepsContainer = styled(IndexContainer)`
  width: 20%;
`;

const SetContainer = styled(IndexContainer)`
  width: 15%;
`;

const CheckContainer = styled.TouchableOpacity`
  width: 10%;
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

const Mainset = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const Warmup = styled(Mainset)`
  color: ${(props) => props.theme.orange};
`;

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

        <CheckContainer>
          <FontAwesome5 name="check" size={23} color="#999999" />
        </CheckContainer>
      </MainContainer>

      {fields.map((item, templateSetIndex) => {
        return (
          <MainContainer key={item.id}>
            <SetContainer>
              {isWarmup ? (
                <SetButton
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Warmup>W</Warmup>
                </SetButton>
              ) : (
                <SetButton
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Mainset>{parseInt(`${templateSetIndex}`) + 1}</Mainset>
                </SetButton>
              )}

              <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
              >
                <SetModal {...{ setModalVisible, setIsWarmup }} />
              </Modal>
            </SetContainer>

            <WeightContainer>
              <Controller
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`}
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
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].InputCount`,
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
                name={`templates[${templateIndex}].templateSets[${templateSetIndex}].InputCount`}
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
                        `templates[${templateIndex}].templateSets[${templateSetIndex}].setCount`,
                        text
                      )
                    }
                  />
                )}
              />
            </RepsContainer>

            <CheckContainer onPress={() => setIsDone(!isDone)}>
              {isDone ? (
                <FontAwesome5 name="check" size={23} color="#32CD32" />
              ) : (
                <FontAwesome5 name="check" size={23} color="#999999" />
              )}
            </CheckContainer>
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
            remove({});
          }}
        />
      </ButtonContainer>
    </Container>
  );
}
