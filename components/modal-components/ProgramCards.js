import { FlatList, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ProgramContainer = styled.View`
  margin: 25px 15px 0 0;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
  padding: 15px;
  width: 230px;
  height: 140px;
`;

const ProgramTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 10px;
`;

const WorkoutTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  color: ${(props) => props.theme.fontColor};
`;

export default function ProgramCards({ programs }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [programModalContent, setProgramModalContent] = useState();
  const navigation = useNavigation();

  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("SeeProgram", { program })}
      >
        <ProgramContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          {/* <Description>
            {program.description && program.description.length > 35
              ? `${program.description.substring(0, 35)}...`
              : program.description}
          </Description> */}

          {program?.templates.map((workout, workoutIndex) => {
            return (
              <WorkoutTitle key={workoutIndex}>{workout.title}</WorkoutTitle>
            );
          })}
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

      {/* <Modal animationType="none" transparent={true} visible={modalVisible}> */}
      {/* <SeeProgram program={programModalContent} {...{ setModalVisible }} /> */}
      {/* </Modal> */}
    </>
  );
}
