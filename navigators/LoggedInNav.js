import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      initialRouteName="Program"
      screenOptions={{
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
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="Program"
        options={{
          title: "프로그램",
          tabBarLabel: "Program",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="running" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Program" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Stats"
        options={{
          title: "운동기록",
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
