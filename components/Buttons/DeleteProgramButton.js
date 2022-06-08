import React from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import { ME_QUERY } from "../../screens/Program";

const DELETE_PROGRAM_MUTATION = gql`
  mutation deleteProgram($id: Int!) {
    deleteProgram(id: $id) {
      ok
      error
    }
  }
`;

const ButtonContainer = styled.TouchableOpacity`
  margin: 5px 0;
  padding: 12px 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.gray};
  width: 49%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0 5px;
  text-align: center;
`;

export default function DeleteProgramButton({ navigation, program }) {
  const onCompleted = (data) => {
    const {
      deleteProgram: { ok, error },
    } = data;
    if (ok) {
      navigation.navigate("StackProgram");
    }
  };

  const [deleteProgramFunction] = useMutation(DELETE_PROGRAM_MUTATION, {
    variables: {
      id: program.id,
    },
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }],
  });

  const onClickDelete = () => {
    Alert.alert("Do you want to delete this program?", "", [
      {
        text: "Delete",
        onPress: () => deleteProgramFunction(),
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <ButtonContainer
      onPress={Platform.OS === "web" ? deleteProgramFunction : onClickDelete}
    >
      <ButtonText>Delete</ButtonText>
    </ButtonContainer>
  );
}
