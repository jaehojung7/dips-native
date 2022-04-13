import React from "react";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

const EDIT_PROGRAM_MUTATION = gql`
  mutation editProgram($id: Int!, $title: String!) {
    editProgram(id: $id, title: $title) {
      ok
      error
    }
  }
`;

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.blue};
  /* margin: 10px; */
  width: 45%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin: 0 5px;
  text-align: center;
`;

export default function SaveProgramButton({ program }) {
  const [editProgramFunction] = useMutation(EDIT_PROGRAM_MUTATION, {
    variables: {
      id: program.id,
      title: program.title,
    },
    onClickDelete,
  });

  const onClickDelete = () => {
    alert("saved");
    editProgramFunction();
  };

  return (
    <ButtonContainer onPress={onClickDelete}>
      <ButtonText>저장</ButtonText>
    </ButtonContainer>
  );
}
