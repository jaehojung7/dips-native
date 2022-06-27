import { React } from "react";
import { View, ActivityIndicator } from "react-native";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import SearchProgramList from "../components/SearchProgramList";
import DismissKeyboard from "../components/DismissKeyboard";
import { Container } from "../components/layouts/MainContainer";

const SEARCH_PROGRAMS_QUERY = gql`
  query searchPrograms($keyword: String!) {
    searchPrograms(keyword: $keyword) {
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
`;
const SearchContainer = styled.View`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 18px;
  font-weight: 600;
  width: 100%;
`;

const InstructionText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.theme.fontColor};
`;

export default function Search({ navigation }) {
  const { handleSubmit, setValue, control } = useForm();

  const [searchProgramsFunction, { data, loading, called }] = useLazyQuery(
    SEARCH_PROGRAMS_QUERY
  );

  const programs = data?.searchPrograms;

  const onSubmitValid = ({ keyword }) => {
    if (loading) {
      return;
    }
    searchProgramsFunction({ variables: { keyword } });
  };

  return (
    <DismissKeyboard>
      <View style={{ marginTop: 5, marginHorizontal: 10 }}>
        <SearchContainer>
          <FontAwesome
            name="search"
            size={16}
            color="lightgray"
            style={{ marginRight: 10 }}
          />
          <Controller
            name="keyword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SearchInput
                placeholder="Search programs"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("keyword", text)}
                onSubmitEditing={handleSubmit(onSubmitValid)}
              />
            )}
          />
        </SearchContainer>
        <View style={{ marginTop: 10 }}>
          {loading ? <ActivityIndicator /> : null}
          {!called ? (
            <InstructionText>Search programs with keyword</InstructionText>
          ) : null}

          {programs !== undefined ? (
            programs?.length === 0 ? (
              <InstructionText>No matching program</InstructionText>
            ) : (
              <SearchProgramList programs={programs} />
            )
          ) : null}
        </View>
      </View>
    </DismissKeyboard>
  );
}
