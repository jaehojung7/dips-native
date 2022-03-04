import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import DeleteExerciseButton from "../components/DeleteExerciseButton";

const Container = styled.View`
  flex: 1;
  margin: 20px 10px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* margin: 0 5px; */
`;

const SearchExerciseTab = styled.TextInput`
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  width: 75%;
  font-size: 15px;
`;

const AddExerciseButton = styled.TouchableOpacity`
  border-radius: 30px;
  width: 10%;
  margin-left: 5px;
  padding: 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

const ListContainer = styled.View`
  margin: 15px 0;
`;

const ExerciseContainer = styled.View``;

const ExerciseTitleContainer = styled.View`
  margin: 5px 10px;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  /* margin: 10px 5px; */
  font-weight: 600;
`;

const ExerciseBodypart = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.gray};
  /* opacity: 0.5 */
  margin-top: 5px;
  /* font-weight: 600; */
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function SearchExercise({ route, navigation }) {
  const { exercises } = route.params;
  const [items, setItems] = useState(exercises);

  const renderProgram = ({ item: exercise }) => {
    return (
      <ExerciseContainer>
        <ExerciseTitleContainer>
          <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
          <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>

          <DeleteExerciseButton
            id={exercise.id}
            exercise={exercise}
            {...{ items, setItems }}
          />
        </ExerciseTitleContainer>
        <BorderLine />
      </ExerciseContainer>
    );
  };

  return (
    <Container showsVerticalScrollIndicator={false}>
      <SearchContainer>
        <SearchExerciseTab placeholder="운동 검색하기" />

        <AddExerciseButton
          onPress={() => navigation.navigate("CreateExercise")}
        >
          <ButtonText>
            <FontAwesome5 name="plus" size={17} />
          </ButtonText>
        </AddExerciseButton>
      </SearchContainer>

      <ListContainer>
        <FlatList
          data={items}
          keyExtractor={(item, index) => "" + index}
          renderItem={renderProgram}
          contentContainerStyle={{ paddingBottom: 25 }}
          // initialNumToRender={10}
          // windowSize={3}
        />
      </ListContainer>
    </Container>
  );
}
