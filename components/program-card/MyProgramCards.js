import { FlatList, Modal, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import ProgramModal from "./ProgramModal";
import {
  ProgramContainer,
  TitleContainer,
  ProgramTitle,
  TitleIcon,
  Description,
} from "./StyledCard";

export default function MyProgramCards({ programs }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [programModalContent, setProgramModalContent] = useState();

  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setProgramModalContent(program);
          setModalVisible(true);
        }}
      >
        <ProgramContainer>
          <TitleContainer>
            <ProgramTitle>{program.title}</ProgramTitle>
            <TitleIcon>
              {program.isPrivate ? (
                <FontAwesome5 name="lock" size={14} />
              ) : (
                <FontAwesome5 name="globe" size={14} />
              )}
            </TitleIcon>
          </TitleContainer>
          <Description>{program.description}</Description>
        </ProgramContainer>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={programs}
        keyExtractor={(program, index) => "" + index}
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

// ProgramList.propTypes = {
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     hashtags: PropTypes.string,
//     isLiked: PropTypes.bool.isRequired,
//     likeCount: PropTypes.number.isRequired,

//   };
