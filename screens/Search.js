import React, { useEffect } from "react";
import styled from "styled-components/native";
import { gql, useLazyQuery } from "@apollo/client";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SearchProgram from "./SearchProgram";
import SearchWorkout from "./SearchWorkout";
import SearchExercise from "./SearchExercise";

const Tab = createMaterialTopTabNavigator();

export default function SearchTab() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          headershown: false,
        },
      }}
    >
      <Tab.Screen
        name="SearchProgram"
        component={SearchProgram}
        options={{
          title: "내 프로그램",
          // tabBarLabel: "내 프로그램",
        }}
      />
      <Tab.Screen
        name="SearchWorkout"
        component={SearchWorkout}
        options={{
          title: "내 워크아웃",
          // tabBarLabel: "내 프로그램",
        }}
      />
      <Tab.Screen
        name="SearchExercise"
        component={SearchExercise}
        options={{
          title: "운동 목록",
          // tabBarLabel: "내 프로그램",
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

// export default function Search({ navigation }) {
//   const { register, handleSubmit, setValue, getValues, control } = useForm();

//   const [searchProgramsFunction, { loading, data }] = useLazyQuery(
//     SEARCH_PROGRAMS_QUERY
//   );
//   console.log(data);

//   const onSubmitValid = ({ keyword }) => {
//     if (loading) {
//       return;
//     }
//     searchProgramsFunction({
//       variables: {
//         keyword,
//       },
//     });
//   };

//   useEffect(() => {
//     register("keyword", {
//       required: true,
//       minLength: 3,
//     });
//   }, [register]);

//   const renderProgram = ({ item: program }) => {
//     return (
//       <View>
//         <Text style={{ color: "green" }}>{program.title}</Text>
//         <Text style={{ color: "green" }}>{program.description}</Text>
//       </View>
//     );
//   };

//   return (
//     <ScreenLayout>
//       <Controller
//         name="keyword"
//         control={control}
//         rules={{ required: true }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <AuthInput
//             placeholderTextColor="gray"
//             placeholder="프로그램 찾기"
//             autoCapitalize="none"
//             returnKeyLabel="Search"
//             returnKeyType="done"
//             autoCorrect={false}
//             onChangeText={(text) => setValue("keyword", text)}
//             onSubmitEditing={handleSubmit(onSubmitValid)}
//           />
//         )}
//       />
//       <MainButton
//         text="프로그램 검색"
//         disabled={false}
//         loading={loading}
//         onPress={handleSubmit(onSubmitValid)}
//       />
//       <FlatList
//         data={data?.searchPrograms}
//         keyExtractor={(program) => "" + program.id}
//         renderItem={renderProgram}
//       />
//     </ScreenLayout>
//   );
// }
