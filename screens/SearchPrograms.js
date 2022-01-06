import React, { useEffect } from "react";
import styled from "styled-components/native";
import { gql, useLazyQuery } from "@apollo/client";
import { Text, View, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { Controller, useForm } from "react-hook-form";
import { AuthInput } from "../components/StyledInput";
import MainButton from "../components/MainButton";

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
    if (loading) {
      return;
    }
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
          <AuthInput
            placeholderTextColor="gray"
            placeholder="프로그램 찾기"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="done"
            autoCorrect={false}
            onChangeText={(text) => setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onSubmitValid)}
          />
        )}
      />
      <MainButton
        text="프로그램 검색"
        disabled={false}
        loading={loading}
        onPress={handleSubmit(onSubmitValid)}
      />
      <FlatList
        data={data?.searchPrograms}
        keyExtractor={(program) => "" + program.id}
        renderItem={renderProgram}
      />
    </ScreenLayout>
  );
}
