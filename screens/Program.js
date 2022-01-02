import React, { useEffect } from "react";
import styled from "styled-components/native";
import MainButton from "../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "../components/AuthInput";
import { gql, useQuery } from "@apollo/client";
import { Text, View, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import SearchProgram from "./SearchProgram";

const ME_QUERY = gql`
  query me {
    me {
      programs {
        id
        title
        description
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
  const navigation = useNavigation();
  const { data, loading } = useQuery(ME_QUERY);
  console.log(data);

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
      <MainButton
        text="새 프로그램 만들기"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram")}
      />
      <FlatList
        data={data?.me?.programs}
        keyExtractor={(program) => "" + program.id}
        renderItem={renderProgram}
      />
      <MainButton
        text="프로그램 찾기"
        disabled={false}
        onPress={() => navigation.navigate("SearchProgram")}
      />
    </ScreenLayout>
  );
}
