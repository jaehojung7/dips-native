import React, { useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Mainset from "./Mainset";
import Warmup from "./Warmup";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Controller, useForm } from "react-hook-form";

const Tab = createMaterialTopTabNavigator();

const HeaderContainer = styled.View`
  margin: 50px 25px 5px 25px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 7px;
`;

const WorkoutTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
`;

const WorkoutTitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 23px;
  font-weight: 700;
`;

export default function WorkoutTab({ route }) {
  const { workout } = route.params;
  const { handleSubmit, setValue, getValues, control, watch } = useForm({});
  return (
    <DismissKeyboard>
      <>
        <HeaderContainer>
          <Header>프로그램 이름</Header>
          {workout === undefined ? (
            <Controller
              name="WorkoutTitle"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <WorkoutTitleInput
                  value={watch("workoutTitle")}
                  placeholder="워크아웃 이름"
                  placeholderTextColor="#999999"
                  onChangeText={(text) => setValue("WorkoutTitle", text)}
                />
              )}
            />
          ) : (
            <WorkoutTitle>{workout.title}</WorkoutTitle>
          )}
        </HeaderContainer>

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 16 },
            tabBarIndicatorStyle: { backgroundColor: "#42a5f5" },
          }}
        >
          <Tab.Screen
            name="Mainset"
            component={Mainset}
            options={{
              title: "Main Set",
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
