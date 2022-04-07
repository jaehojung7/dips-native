import { FlatList, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ProgramContainer = styled.View`
  margin: 15px 15px 0 0;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
  padding: 15px 20px;
  width: 210px;
  height: 140px;
`;

const ProgramTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.fontColor};
  /* text-align: center; */
`;

const WorkoutTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
  color: ${(props) => props.theme.fontColor};
  opacity: 0.5;
  /* text-align: center; */
`;

export default function ProgramCards({ programs }) {
  const navigation = useNavigation();

  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("SeeProgram", { program })}
      >
        <ProgramContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          {program?.workouts.map((workout, workoutIndex) => {
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
