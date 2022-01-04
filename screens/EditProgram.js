import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

const EDIT_PROGRAM_MUTATION = gql`
  mutation editProgram($id: Int!, $description: String!) {
    editProgram(id: $id, description: $description) {
      # title: $title 추가
      ok
      id
      error
    }
  }
`;

export default function editProgram({ route }) {
  const { register, handleSubmit, setValue, getValues, watch, control } =
    useForm({
      defaultValues: {
        email: route.params?.email,
      },
    });
  return (
    <View>
      <Text>
        <FontAwesome5 name="edit" size={24} color="black" />
      </Text>
    </View>
  );
}
