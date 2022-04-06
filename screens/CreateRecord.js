import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MainSets from "./MainSets";
import Warmup from "./Warmup";
import DismissKeyboard from "../components/DismissKeyboard";

const Tab = createMaterialTopTabNavigator();

export default function CreateRecord({ route }) {
  let { workout } = route?.params;
  if (workout === undefined) {
    workout = {};
  }

  return (
    <DismissKeyboard>
      <>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16 },
            tabBarIndicatorStyle: { backgroundColor: "#42a5f5" },
          }}
        >
          <Tab.Screen
            name="MainSets"
            component={MainSets}
            options={{
              title: "Main Sets",
            }}
            initialParams={{ workout }}
          />

          <Tab.Screen
            name="Warmup"
            component={Warmup}
            options={{
              title: "Warm up",
            }}
            initialParams={{ workout }}
          />
        </Tab.Navigator>
      </>
    </DismissKeyboard>
  );
}
