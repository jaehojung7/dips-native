import { gql, useMutation } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

const DELETE_EXERCISE_MUTATION = gql`
  mutation deleteExercise($id: Int!) {
    deleteExercise(id: $id) {
      ok
      error
    }
  }
`;

const Button = styled.TouchableOpacity`
  margin-left: 13px;
  justify-content: center;
  margin-top: -15px;
`;

const ButtonText = styled.Text`
  color: tomato;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

export default function DeleteExerciseButton({
  id,
  items,
  setItems,
  exercise,
}) {
  const [deleteExerciseMutation] = useMutation(DELETE_EXERCISE_MUTATION, {
    variables: {
      id,
    },
  });

  const onfilterExercise = () => {
    setItems(items.filter((item) => item.id !== exercise.id));
  };

  const onClickDeleteExercise = () => {
    deleteExerciseMutation();
  };

  return (
    <Button onPress={(onClickDeleteExercise, onfilterExercise)}>
      <ButtonText>
        <FontAwesome name="times" size={18} />
      </ButtonText>
    </Button>
  );
}
