import React from "react";
import { gql, useQuery } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SharedStackNav from "./SharedStackNav";
import { useColorScheme, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      email
      programs {
        id
        title
        user {
          username
        }
        isLiked
        isMine
        isPublic
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
      exercises {
        id
        exercise
        bodyPart
      }
      recentProgram {
        id
        title
        user {
          username
        }
        isLiked
        isMine
        isPublic
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
      likes {
        program {
          id
          title
          user {
            username
          }
          isLiked
          isMine
          isPublic
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
      }
    }
  }
`;

const Tabs = createBottomTabNavigator();

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export default function LoggedInNav() {
  const { data, loading, refetch } = useQuery(ME_QUERY);
  const scheme = useColorScheme();
  if (loading)
    return (
      <IndicatorContainer>
        <ActivityIndicator />
      </IndicatorContainer>
    );

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        // headerTitleAlign: "left",
        // headerTitleStyle: {
        //   color: "#FF7F50",
        //   fontSize: 26,
        //   fontWeight: "700",
        //   marginTop: 25,
        //   marginLeft: 10,
        // },
        // headerStyle: {
        //   shadowColor: "transparent",
        //   height: 70,
        // },
        tabBarActiveTintColor: scheme === "dark" ? "#FF7F50" : "#2389da",
        tabBarInactiveTintColor: "#797d7f",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tabs.Screen
        name="Programs"
        options={{
          tabBarLabel: "Programs",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={22} color={color} />
          ),
        }}
      >
        {() => (
          <SharedStackNav
            screenName="Program"
            data={data}
            loading={loading}
            refetch={refetch}
          />
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Records"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart-o" size={22} color={color} />
          ),
        }}
      >
        {() => (
          <SharedStackNav
            screenName="Record"
            data={data}
            loading={loading}
            refetch={refetch}
          />
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={22} color={color} />
          ),
        }}
      >
        {() => (
          <SharedStackNav
            screenName="Setting"
            data={data}
            loading={loading}
            refetch={refetch}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
