import { FlatList, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import ProgramModal from "./ProgramModal";
import ProgramContainer from "./ProgramContainer";
import TitleContainer from "./TitleContainer";
import { TitleText } from "./TitleText";
import { TitleIcon } from "./TitleIcon";
import { DescriptionText } from "./DescriptionText";

export default function FavProgramCards({ likes }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [programModalContent, setProgramModalContent] = useState();

  const renderProgram = ({ item: like }) => {
    return (
      <ProgramContainer>
        <TouchableOpacity
          onPress={() => {
            setProgramModalContent(like.program);
            setModalVisible(true);
          }}
        >
          <TitleContainer>
            <TitleText>{like.program.title}</TitleText>
            <TitleIcon>
              <FontAwesome name="star" size={14} /> {like.program.likeCount}
            </TitleIcon>
          </TitleContainer>
          <DescriptionText>{like.program.description}</DescriptionText>
        </TouchableOpacity>
      </ProgramContainer>
    );
  };

  return (
    <>
      <FlatList
        data={likes}
        keyExtractor={(like, index) => "" + index}
        renderItem={renderProgram}
        horizontal
        initialNumToRender={3}
        windowSize={3}
      />
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <ProgramModal program={programModalContent} {...{ setModalVisible }} />
      </Modal>
    </>
  );
}
