import { FlatList, Modal, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import ProgramModal from "./ProgramModal";
import ProgramContainer from "./ProgramContainer";
import TitleContainer from "./TitleContainer";
import { TitleText } from "./TitleText";
import { TitleIcon } from "./TitleIcon";
import { DescriptionText } from "./DescriptionText";

export default function MyProgramCards({ programs }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [programModalContent, setProgramModalContent] = useState();

  const renderProgram = ({ item: program }) => {
    return (
      <ProgramContainer>
        <TouchableOpacity
          onPress={() => {
            setProgramModalContent(program);
            setModalVisible(true);
          }}
        >
          <TitleContainer>
            <TitleText>{program.title}</TitleText>
            <TitleIcon>
              {program.isPrivate ? (
                <FontAwesome5 name="lock" size={14} />
              ) : (
                <FontAwesome5 name="globe" size={14} />
              )}
            </TitleIcon>
          </TitleContainer>
          <DescriptionText>{program.description}</DescriptionText>
        </TouchableOpacity>
      </ProgramContainer>
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
