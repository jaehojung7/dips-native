import React from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import { ME_QUERY } from "../../navigators/LoggedInNav";

const DELETE_RECORD_MUTATION = gql`
  mutation deleteRecord($id: Int!) {
    deleteRecord(id: $id) {
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

export default function DeleteRecordButton({ navigation, record }) {
  const onCompleted = (data) => {
    const {
      deleteRecord: { ok, error },
    } = data;
    if (ok) {
      navigation.navigate("StackRecord");
    }
  };

  const [deleteRecordFunction] = useMutation(DELETE_RECORD_MUTATION, {
    variables: {
      id: record.id,
    },
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }],
  });

  const onClickDelete = () => {
    Alert.alert("운동 기록을 삭제할까요?", "", [
      {
        text: "Delete",
        onPress: () => deleteRecordFunction(),
        style: "destructive",
      },
      {
        text: "Cancel",
        // onPress: () => closeSwipeable(),
        style: "cancel",
      },
    ]);
  };

  return (
    <ButtonContainer
      onPress={Platform.OS === "web" ? deleteRecordFunction : onClickDelete}
    >
      <ButtonText>Delete</ButtonText>
    </ButtonContainer>
  );
}
