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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function Program() {
  const navigation = useNavigation();
  const { data, loading } = useQuery(ME_QUERY);

  const renderProgram = ({ item: program }) => {
    return (
      <View>
        <Text style={{ color: "red" }}>{program.title}</Text>
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
        // horizontal
        data={data?.me?.programs}
        keyExtractor={(program) => "" + program.id}
        renderItem={renderProgram}
      />
    </ScreenLayout>
  );
}
