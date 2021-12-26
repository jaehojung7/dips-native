import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Program from "../screens/Program";
import Workout from "../screens/Workout";
import Stats from "../screens/Stats";
import Profile from "../screens/Profile";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      initialRouteName="Program"
      screenOptions={{
        headerTitleStyle: {
          color: "#FF7F50",
          fontSize: 19,
          fontWeight: "700",
        },
        headerStyle: {
          shadowColor: "gray",
        },
        tabBarActiveTintColor: "#FF7F50",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 11 },
        tabBarStyle: {
          borderTopColor: "gray",
        },
      }}
    >
      <Tabs.Screen
        name="Program"
        options={{
          title: "프로그램",
          tabBarLabel: "Program",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={24} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Program" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Workout"
        options={{
          title: "운동하기",
          tabBarLabel: "Workout",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="running" size={24} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Workout" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Stats"
        options={{
          title: "기록보기",
          tabBarLabel: "Stats",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart-o" size={24} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Stats" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        options={{
          title: "내 프로필",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Profile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
