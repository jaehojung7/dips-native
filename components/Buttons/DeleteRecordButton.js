import React from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

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
  padding: 12px;
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
  const deleteRecordUpdate = (cache, result) => {
    const {
      data: {
        deleteRecord: { ok, error },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Record:${record.id}` });
    }
  };

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
    update: deleteRecordUpdate,
  });

  const onClickDelete = () => {
    Alert.alert("Do you want to delete this record?", "", [
      {
        text: "Delete",
        onPress: () => deleteRecordFunction(),
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
      onPress={Platform.OS === "web" ? deleteRecordFunction : onClickDelete}
    >
      <ButtonText>Delete</ButtonText>
    </ButtonContainer>
  );
}
