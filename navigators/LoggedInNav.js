import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Workout from "../screens/Workout";
import Stats from "../screens/Stats";
import Plan from "../screens/Plan";
import ColorText, { colors } from "../styles";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      initialRouteName="Workout"
      screenOptions={{
        headerTitleStyle: { color: "#ee6600", fontSize: 19, fontWeight: "700" },
        tabBarActiveTintColor: "#ee6600",
        tabBarInactiveTintColor: "gray",
        // tabBarStyle: { borderTopColor: "#ee6600" },
      }}
    >
      <Tabs.Screen
        name="Plan"
        component={Plan}
        options={{
          title: "프로그램",
          tabBarLabel: "Program",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="calendar-check" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Workout"
        component={Workout}
        options={{
          title: "운동하기",
          tabBarLabel: "Workout",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="running" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Stats"
        component={Stats}
        options={{
          title: "운동기록",
          tabBarLabel: "Stats",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="bar-chart-o" size={25} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
