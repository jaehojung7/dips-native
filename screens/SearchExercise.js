import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import ExerciseList from "./ExerciseList";

const DELETE_EXERCISE_MUTATION = gql`
  mutation deleteExercise($id: Int!) {
    deleteExercise(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.ScrollView`
  /* flex: 1; */
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

const ExerciseContainer = styled.View``;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

const renderRightActions = (progress, dragX) => {
  const trans = dragX.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <DeleteButton onPress={onFilterExercise}>
      <DeleteText>Delete</DeleteText>
    </DeleteButton>
  );
};

export default function SearchExercise({ route, navigation }) {
  const { exercises } = route.params;
  const [items, setItems] = useState(exercises);
  // const [deleteExerciseMutation] = useMutation(DELETE_EXERCISE_MUTATION, {
  //   variables: {
  //     id,
  //   },
  // });

  // const onDeleteExercise = (id) => {
  //   deleteExerciseMutation(id);
  //   console.log(id);
  // };

  const onFilterExercise = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setItems(items.filter((item) => item.id !== id));
    console.log(id);
  };

  const onDelete = (id) => {
    // onDeleteExercise(id);
    onFilterExercise(id);
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

      <ExerciseList exercises={exercises} onDelete={onDelete} />
    </Container>
  );
}
