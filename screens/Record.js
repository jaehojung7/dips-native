import { React, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { FlatList, LayoutAnimation } from "react-native";
import WorkoutRecord from "../components/record-components/WorkoutRecord";
import ExpandSetButton from "../components/Buttons/ExpandSetButton";

const ME_QUERY = gql`
  query me {
    me {
      id
      records {
        id
        title
        date
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

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const HeaderContainer = styled.View`
  margin: 40px 25px 5px 25px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const RecordContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin: 20px 10px;
  padding: 15px;
`;

const RecordTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecordTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 7px;
`;

const RecordDate = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.gray};
  /* margin-bottom: 7px; */
  text-align: right;
`;

export default function Record({ navigation }) {
  // https://stackoverflow.com/questions/60736179/how-to-usestate-and-usequery-in-apollo-graphql-and-react
  const { data, loading } = useQuery(ME_QUERY);
  const [expanded, setExpanded] = useState([false]);

  const records = data?.me.records;

  useEffect(() => {
    if (loading === false && data) {
      records.length > 0
        ? setExpanded([true].concat(Array(records.length - 1).fill(false)))
        : setExpanded([false]);
    }
  }, [loading, data]);

  if (loading)
    return (
      <IndicatorContainer>
        <ActivityIndicator color="#FF7F50" />
      </IndicatorContainer>
    );

  const handleClick = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((arr) => [...arr.slice(0, id), !arr[id], ...arr.slice(id + 1)]);
  };

  const renderRecord = ({ item: record, index }) => {
    return (
      <RecordContainer>
        <RecordTitleContainer>
          <RecordTitle>{record?.title}</RecordTitle>
          <ExpandSetButton
            onPress={() => {
              handleClick(index);
            }}
          />
        </RecordTitleContainer>
        <RecordDate>{record?.date}</RecordDate>
        {expanded[index] && (
          <WorkoutRecord recordExercises={record?.recordExercises} />
        )}
      </RecordContainer>
    );
  };

  return (
    <>
      <HeaderContainer>
        <Header>기록</Header>
      </HeaderContainer>
      <FlatList
        data={records}
        keyExtractor={(item, index) => "" + index}
        renderItem={renderRecord}
        initialNumToRender={3}
        windowSize={2}
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
