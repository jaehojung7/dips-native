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
      screenOptions={{
        headerShown: false,
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
        {() => <SharedStackNav screenName="Program" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Records"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart-o" size={22} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Record" />}
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
        {() => <SharedStackNav screenName="Setting" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
