import { FlatList, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useState } from "react";
import ProgramModal from "./ProgramModal";

const ProgramContainer = styled.View`
  margin: 25px 15px 0 0;
  border: 1px solid ${(props) => props.theme.darkgray};
  border-radius: 20px;
  padding: 15px;
  width: 230px;
  height: 150px;
`;

const ProgramTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

const Description = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  color: ${(props) => props.theme.darkgray};
`;

const WorkoutTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  color: ${(props) => props.theme.fontColor};
`;

export default function MyProgramCards({ programs }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [programModalContent, setProgramModalContent] = useState();

  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
      // onPress={() => {
      //   setProgramModalContent(program);
      //   setModalVisible(true);
      // }}
      >
        <ProgramContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <Description>
            {program.description && program.description.length > 35
              ? `${program.description.substring(0, 35)}...`
              : program.description}
          </Description>
          <WorkoutTitle>{program.templates[0].title}</WorkoutTitle>
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
        showsHorizontalScrollIndicator={false}
      />
      {/* <Modal animationType="none" transparent={true} visible={modalVisible}>
        <ProgramModal program={programModalContent} {...{ setModalVisible }} />
      </Modal> */}
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
