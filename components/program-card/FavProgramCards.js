import { FlatList, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import ProgramModal from "./ProgramModal";
import {
  ProgramContainer,
  TitleContainer,
  ProgramTitle,
  TitleIcon,
  Description,
} from "./StyledCard";

export default function FavProgramCards({ likes }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [programModalContent, setProgramModalContent] = useState();

  const renderProgram = ({ item: like }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setProgramModalContent(like.program);
          setModalVisible(true);
        }}
      >
        <ProgramContainer>
          <TitleContainer>
            <ProgramTitle>{like.program.title}</ProgramTitle>
            <TitleIcon>
              <FontAwesome name="star" size={14} /> {like.program.likeCount}
            </TitleIcon>
          </TitleContainer>
          <Description>
            {like.program.description.length > 35
              ? `${like.program.description.substring(0, 35)}...`
              : like.program.description}
          </Description>
        </ProgramContainer>
      </TouchableOpacity>
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
