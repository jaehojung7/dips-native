import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";

const ModalContainer = styled.View`
  flex: 1;
  padding: 10px 0;
  background-color: ${(props) => props.theme.modalBackground};
`;

const Container = styled.View`
  padding-bottom: 5px;
`;

const ButtonContainer = styled.TouchableOpacity`
  margin: 10px 15px 5px 0;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 16px;
  font-weight: 600;
  text-align: right;
`;

const ExerciseTitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 15px;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
`;

const ExerciseBodypart = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.gray};
  margin-top: 3px;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function ExerciseListModalProgram({
  exercises,
  setValue,
  setModalVisible,
  workoutIndexState,
  workoutSetIndexState,
}) {
  const renderItem = ({ item: exercise }) => {
    return (
      <Container>
        <ExerciseTitleContainer
          onPress={() => {
            setValue(
              `workouts[${workoutIndexState}].workoutSets[${workoutSetIndexState}].exercise`,
              exercise.exercise
            );
            setModalVisible(false);
          }}
        >
          <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
          <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
        </ExerciseTitleContainer>
        <BorderLine />
      </Container>
    );
  };

  const SearchBox = (
    <ButtonContainer
      onPress={() => {
        setModalVisible(false);
      }}
    >
      <ButtonText>닫기</ButtonText>
    </ButtonContainer>
  );

  return (
    <ModalContainer>
      <FlatList
        data={exercises}
        keyExtractor={(exercise, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={3}
        windowSize={3}
        ListHeaderComponent={SearchBox}
      />
    </ModalContainer>
  );
}
