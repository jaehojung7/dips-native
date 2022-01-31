import React, { useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SearchProgram from "./SearchProgram";
import SearchExercise from "./SearchExercise";
import { useColorScheme } from "react-native";

const ME_QUERY = gql`
  query me {
    me {
      programs {
        id
        title
        description
        isPrivate
        likeCount
        templates {
          title
        }
      }
    }
  }
`;

const Tab = createMaterialTopTabNavigator();

export default function SearchTab() {
  const { data, loading } = useQuery(ME_QUERY);
  const scheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarIndicatorStyle: { backgroundColor: "#42a5f5" },
      }}
    >
      <Tab.Screen
        name="SearchProgram"
        component={SearchProgram}
        options={{
          title: "내 프로그램",
        }}
        initialParams={{ programs: data?.me?.programs }}
      />

      <Tab.Screen
        name="SearchExercise"
        component={SearchExercise}
        options={{
          title: "운동 목록",
        }}
      />
    </Tab.Navigator>
  );
}
