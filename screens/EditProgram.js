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
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DescriptionInput
            placeholder="프로그램 설명"
            placeholderTextColor="#797d7f"
            multiline={true}
            maxLength={50}
            onChangeText={(text) => setValue("description", text)}
          />
        )}
      />

      {/* <TemplateArray
          {...{
            control,
            getValues,
            setValue,
          }}
        /> */}

      {/* <>
          {program?.templates.map((template, index) => {
            return (
              <WorkoutContainer key={index}>
                <WorkoutTitle>{template.title}</WorkoutTitle>
                <StartButton
                  text="워크아웃 시작"
                  onPress={() => {
                    navigation.navigate("CreateWorkout");
                  }}
                />
              </WorkoutContainer>
            );
          })}
        </> */}
    </View>
  );
}
