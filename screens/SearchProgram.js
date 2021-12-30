import React, { useEffect } from "react";
import styled from "styled-components/native";
import { gql } from "@apollo/client";
import { Text, View, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

const SEARCH_PROGRAM = gql`
  query searchProgram($keyword: String!) {
    searchProgram(keyword: $keyword) {
      id
    }
  }
`;

export default function Program() {
  const { register, handleSubmit, setValue, getValues, control, watch } =
    useForm();
  const navigation = useNavigation();
  const [startQueryFuction, { loading, data }] = useLazyQuery(SEARCH_PROGRAM, {
    variables: {
      keyword: watch("keyword"),
    },
  });

  const renderProgram = ({ item: program }) => {
    return (
      <View>
        <Text style={{ color: "black" }}>{program.description}</Text>
      </View>
    );
  };

  useEffect(() => {
    register("keyword", {
      required: true,
    });
  }, [register]);

  return (
    <ScreenLayout>
      <Controller
        name="SearchProgram"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={watch("title")}
            placeholder="프로그램 찾기"
            returnKeyType="search"
            placeholderTextColor="gray"
            onChangeText={(text) => setValue("keyword", text)}
            onSubmitEditing={startQueryFuction}
          />
        )}
      />
    </ScreenLayout>
  );
}
