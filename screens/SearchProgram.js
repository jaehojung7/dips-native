import { FlatList, Modal, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useState } from "react";
import ProgramModal from "../components/modal-components/ProgramModal";

const TitleContainer = styled.View``;

const ProgramTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  margin: 13px 0 13px 15px;
  font-weight: 600;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightgray};
  opacity: 0.5;
`;

export default function SearchProgram({ route, navigation }) {
  const { programs } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [programModalContent, setProgramModalContent] = useState();
  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProgramModal");
        }}
      >
        <TitleContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <BorderLine />
        </TitleContainer>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={programs}
        keyExtractor={(program, index) => "" + index}
        renderItem={renderProgram}
        initialNumToRender={10}
        // windowSize={3}
      />
      {/* <Modal animationType="none" transparent={true} visible={modalVisible}>
        <ProgramModal program={programModalContent} {...{ setModalVisible }} />
      </Modal> */}
    </>
  );
}
