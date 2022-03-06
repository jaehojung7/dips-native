import { gql, useMutation } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";
import Swipeable from "react-native-gesture-handler/Swipeable";

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

  const onDeleteExercise = () => {
    deleteExerciseMutation();
  };

  const onFilterExercise = () => {
    setItems(items.filter((item) => item.id !== exercise.id));
  };

  const onClickfunction = () => {
    onDeleteExercise();
    onFilterExercise();
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Button onPress={onClickfunction}>
        <ButtonText>Delete</ButtonText>
      </Button>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
    // <Button onPress={onClickfunction}>
    //   <ButtonText>Delete</ButtonText>
    // </Button>
  );
}
