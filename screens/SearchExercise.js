import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import ExerciseList from "./ExerciseList";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function SearchExercise({ route, navigation }) {
  const { exercises } = route.params;

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

      <ExerciseList exercises={exercises} />
    </Container>
  );
}
