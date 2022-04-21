import React from "react";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

const DELETE_PROGRAM_MUTATION = gql`
  mutation deleteProgram($id: Int!) {
    deleteProgram(id: $id) {
      ok
      error
    }
  }
`;

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px 25px;
  border-radius: 20px;
  background-color: tomato;
  /* margin: 10px; */
  width: 45%;
`;

const ButtonText = styled.Text`
  color: white
  font-size: 16px;
  font-weight: 600;
  margin: 0 5px;
  text-align: center;
`;

export default function DeleteProgramButton({ program }) {
  const [deleteProgramFunction] = useMutation(DELETE_PROGRAM_MUTATION, {
    variables: {
      id: program.id,
    },
    onClickDelete,
  });

  const onClickDelete = () => {
    alert("Deleted");
    deleteProgramFunction();
  };

  return (
    <ButtonContainer onPress={onClickDelete}>
      {/* onPress 실행 직전 경고 */}
      <ButtonText>삭제</ButtonText>
    </ButtonContainer>
  );
}
