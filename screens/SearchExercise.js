import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Modal, TouchableOpacity } from "react-native";

const Container = styled.View`
  margin: 20px 10px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
`;

const ListContainer = styled.View`
  margin: 20px 0;
  /* background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px; */
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
  margin-top: 5px;
  /* font-weight: 600; */
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

const Button = styled.TouchableOpacity`
  border-radius: 30px;
  /* border: 1px solid black; */
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export default function SearchExercise({ route, navigation }) {
  const { exercises } = route.params;
  const renderProgram = ({ item: exercise }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("SeeProgram", { program });
        }}
      >
        <ExerciseContainer>
          <ExerciseTitleContainer>
            <ExerciseTitle>{exercise.exercise}</ExerciseTitle>
            <ExerciseBodypart>{exercise.bodyPart}</ExerciseBodypart>
          </ExerciseTitleContainer>
          <BorderLine />
        </ExerciseContainer>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <SearchContainer>
        <ExerciseContainer>
          <ExerciseTitle>운동 찾기</ExerciseTitle>
        </ExerciseContainer>

        <Button onPress={() => navigation.navigate("CreateExercise")}>
          <ButtonText>운동 추가하기</ButtonText>
        </Button>
      </SearchContainer>
      <ListContainer>
        <FlatList
          data={exercises}
          keyExtractor={(exercise, index) => "" + index}
          renderItem={renderProgram}
          initialNumToRender={10}
          // windowSize={3}
        />
      </ListContainer>
    </Container>
  );
}
