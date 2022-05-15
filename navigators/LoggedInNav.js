import React from "react";
import { gql, useQuery } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SharedStackNav from "./SharedStackNav";
import Program from "../screens/Program";

export const ME_QUERY = gql`
  query me {
    me {
      id
      programs {
        id
        title
        workouts {
          title
          workoutIndex
          workoutSets {
            id
            exercise
            setCount
            repCount
          }
        }
      }
      exercises {
        id
        exercise
        bodyPart
      }
      recentProgram {
        id
        title
        workouts {
          title
          workoutIndex
          workoutSets {
            id
            exercise
            setCount
            repCount
          }
        }
      }
      recentWorkoutIndex
      records {
        id
        title
        date
        recordExercises {
          id
          recordExerciseIndex
          exercise
          recordExerciseSets {
            recordExerciseSetIndex
            weight
            repCount
          }
        }
      }
    }
  }
`;

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const { data, loading } = useQuery(ME_QUERY);
  if (loading) return "Loading...";

  const me = data?.me;

  return (
    <Tabs.Navigator
      // initialRouteName="Search"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "left",
        headerTitleStyle: {
          color: "#FF7F50",
          fontSize: 26,
          fontWeight: "700",
          marginTop: 25,
          marginLeft: 10,
        },
        headerStyle: {
          shadowColor: "transparent",
          height: 70,
        },
        tabBarActiveTintColor: "#FF7F50",
        tabBarInactiveTintColor: "#797d7f",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tabs.Screen
        name="Workout"
        options={{
          // title: "프로그램",
          tabBarLabel: "Program",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="running" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Program" data={me} />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Record"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart-o" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Record" data={me} />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" data={me} />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Profile" data={me} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
