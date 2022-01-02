import React, { useEffect } from "react";
import styled from "styled-components/native";
import { gql, useLazyQuery } from "@apollo/client";
import { Text, View, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../components/AuthInput";

const SEARCH_PROGRAMS_QUERY = gql`
  query searchPrograms($keyword: String!) {
    searchPrograms(keyword: $keyword) {
      id
      title
      description
      # hashtags
      # likeCount
      # user {
      #   username
      # }
    }
  }
`;

export default function SearchPrograms({ navigation }) {
  const { register, handleSubmit, setValue, getValues, control } = useForm();

  const [searchProgramsFunction, { loading, data }] = useLazyQuery(
    SEARCH_PROGRAMS_QUERY
  );
  console.log(data);

  const onSubmitValid = ({ keyword }) => {
    searchProgramsFunction({
      variables: {
        keyword,
      },
    });
  };

  useEffect(() => {
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, [register]);

  const renderProgram = ({ item: program }) => {
    return (
      <View>
        <Text style={{ color: "green" }}>{program.title}</Text>
        <Text style={{ color: "green" }}>{program.description}</Text>
      </View>
    );
  };

  return (
    <ScreenLayout>
      <Controller
        name="keyword"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholderTextColor="gray"
            placeholder="프로그램 찾기"
            autoCapitalize="none"
            // returnKeyLabel="Search"
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={(text) => setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onSubmitValid)}
          />
        )}
      />
      <FlatList
        data={data?.searchPrograms}
        keyExtractor={(program) => "" + program.id}
        renderItem={renderProgram}
      />
    </ScreenLayout>
  );
}