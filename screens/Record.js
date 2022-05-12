import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import WorkoutRecord from "../components/record-components/WorkoutRecord";

const ME_QUERY = gql`
  query me {
    me {
      id
      records {
        id
        title
        recordExercises {
          id
          recordExerciseIndex
          exercise
          recordExerciseSets {
            recordExerciseSetIndex
            weight
            repCount
          }
        }
      }
    }
  }
`;

const HeaderContainer = styled.View`
  margin: 50px 25px 5px 25px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const RecordContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin: 20px 10px 0 10px;
  padding: 15px;
`;

const RecordTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 7px;
`;

export default function Record({ navigation }) {
  const { data } = useQuery(ME_QUERY);
  const records = data?.me?.records;
  console.log(records);

  const renderRecord = ({ item: record }) => {
    return (
      <RecordContainer>
        <RecordTitle>{record.title}</RecordTitle>
        <WorkoutRecord recordExercises={record.recordExercises} />
      </RecordContainer>
    );
  };

  return (
    <>
      <HeaderContainer>
        <Header>운동기록</Header>
      </HeaderContainer>
      <FlatList
        data={records}
        keyExtractor={(item, index) => "" + index}
        renderItem={renderRecord}
        initialNumToRender={3}
        windowSize={2}
        maxToRenderPerBatch={1}
        // onEndReachedThreshold={0}
        // onEndReached={() =>
        //   fetchMore({
        //     variables: {
        //       offset: data?.me?.length,
        //     },
        //   })
        // }
      />
    </>
  );
}
