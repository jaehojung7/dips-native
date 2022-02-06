import React, { useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchProgram from "./SearchProgram";
import SearchExercise from "./SearchExercise";

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
  console.log(data);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16 },
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
