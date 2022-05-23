import { React } from "react";
import { ActivityIndicator } from "react-native";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import ProgramCardsHorizontal from "../components/ProgramCards";

const SEARCH_PROGRAMS_QUERY = gql`
  query searchPrograms($keyword: String!) {
    searchPrograms(keyword: $keyword) {
      id
      title
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

const HeaderContainer = styled.View`
  margin: 40px 25px 5px 15px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

const SearchContainer = styled.View`
  margin: 10px 10px;
  padding: 15px 25px;
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

const ProgramsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InstructionText = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const ProgramContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin: 10px 10px;
  padding: 15px;
`;

const ProgramTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ProgramTitle = styled.Text`
  font-size: 19px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const ProgramSubheaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 5px;
  margin-bottom: 7px;
`;

const ProgramDate = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.gray};
  /* margin-bottom: 7px; */
  text-align: left;
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

  // const renderProgram = ({ item: program, index }) => {
  //   return (
  //     <ProgramContainer>
  //       <ProgramTitleContainer>
  //         <ProgramTitle>{program?.title}</ProgramTitle>
  //       </ProgramTitleContainer>
  //       <ProgramSubheaderContainer>
  //         <ProgramDate>{Program?.date}</ProgramDate>
  //         <EditProgram
  //           onPress={() =>
  //             navigation.navigate("EditProgram", { Program, exercises })
  //           }
  //         >
  //           <EditText>Edit</EditText>
  //         </EditProgram>
  //       </ProgramSubheaderContainer>
  //       {expanded[index] && (
  //         <WorkoutProgram ProgramExercises={Program?.ProgramExercises} />
  //       )}
  //     </ProgramContainer>
  //   );
  // };

  return (
    <>
      <HeaderContainer>
        <Header>Search</Header>
      </HeaderContainer>
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
      <ProgramsContainer>
        {loading ? <ActivityIndicator /> : null}
        {!called ? (
          <InstructionText>Search programs with keyword</InstructionText>
        ) : null}
        {programs !== undefined ? (
          programs?.length === 0 ? (
            <InstructionText>No matching program</InstructionText>
          ) : (
            <ProgramCardsHorizontal programs={programs} />
          )
        ) : null}
      </ProgramsContainer>
    </>
  );
}
