import React, { useEffect } from "react";
import styled from "styled-components/native";
import MainButton from "../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../components/AuthInput";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Text, View, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

const ME_QUERY = gql`
  query me {
    me {
      programs {
        id
        title
        description
        likeCount
      }
      # likes {}
    }
  }
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function Program() {
  const { data, loading } = useQuery(ME_QUERY);
  const navigation = useNavigation();
  const renderProgram = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: "black" }}>{item.title}</Text>
      </View>
    );
  };

  return (
    <ScreenLayout>
      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram")}
      />
      <FlatList
        data={data?.me}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderProgram}
      />
    </ScreenLayout>
  );
}
