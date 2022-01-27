import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SharedStackNav from "./SharedStackNav";
import { useColorScheme } from "react-native";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const scheme = useColorScheme();
  return (
    <Tabs.Navigator
      initialRouteName="Program"
      screenOptions={{
        headerTitleAlign: "left",
        headerTitleContainerStyle: {},
        headerTitleStyle: {
          color: "#FF7F50",
          fontSize: 25,
          fontWeight: "700",
          marginTop: 20,
          marginLeft: 10,
        },
        headerStyle: {
          shadowColor: "transparent",
          height: 70,
          backgroundColor: scheme === "dark" ? "black" : "white",
        },
        tabBarActiveTintColor: "#FF7F50",
        tabBarInactiveTintColor: "#797d7f",
        tabBarLabelStyle: { fontSize: 11 },
        tabBarStyle: {
          borderTopColor: "#cacfd2",
          backgroundColor: scheme === "dark" ? "black" : "white",
        },
      }}
    >
      <Tabs.Screen
        name="Program"
        options={{
          title: "프로그램",
          tabBarLabel: "Program",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={22} color={color} />
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
            <FontAwesome5 name="running" size={22} color={color} />
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
            <FontAwesome name="bar-chart-o" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Stats" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          title: "검색하기",
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Profile"
        options={{
          title: "내 프로필",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Profile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
