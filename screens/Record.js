import { React, useState, useEffect } from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  LayoutAnimation,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import WorkoutRecord from "../components/record-components/WorkoutRecord";
import { FontAwesome5 } from "@expo/vector-icons";
import { SuccessMessage } from "../components/layouts/MainContainer";
import DismissKeyboard from "../components/DismissKeyboard";

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
      exercises {
        id
        exercise
        bodyPart
      }
    }
  }
`;

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const RecordContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 10px;
  padding: 15px;
`;

const RecordTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RecordTitle = styled.Text`
  font-size: 21px;
  font-weight: 700;
  width: 85%;
  color: ${(props) => props.theme.fontColor};
`;

const RecordDate = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.gray};
  text-align: left;
`;

const Button = styled.TouchableOpacity`
  padding: 5px 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const EditRecord = styled.TouchableOpacity`
  color: ${(props) => props.theme.fontColor};
`;

const EditText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 16px;
  font-weight: 700;
`;

export default function Record({ navigation, route }) {
  // https://stackoverflow.com/questions/60736179/how-to-usestate-and-usequery-in-apollo-graphql-and-react
  const { data, loading, refetch } = useQuery(ME_QUERY);
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState([false]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const successMessage = route.params?.successMessage;
  const records = data?.me.records;
  const exercises = data?.me.exercises;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setSuccessMessageVisible(false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (loading === false && data) {
      records.length > 0
        ? setExpanded([true].concat(Array(records.length - 1).fill(false)))
        : setExpanded([false]);
    }
  }, [loading, data]);

  DeviceEventEmitter.addListener("event.createRecord", (data) =>
    setSuccessMessageVisible(true)
  );
  DeviceEventEmitter.addListener("event.editRecord", (data) =>
    setSuccessMessageVisible(true)
  );

  if (loading)
    return (
      <IndicatorContainer>
        <ActivityIndicator />
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
          <Button
            onPress={() => {
              handleClick(index);
            }}
          >
            <ButtonText>
              {expanded[index] ? (
                <FontAwesome5 name="angle-up" size={25} />
              ) : (
                <FontAwesome5 name="angle-down" size={25} />
              )}
            </ButtonText>
          </Button>
        </RecordTitleContainer>
        <RecordTitleContainer>
          <RecordDate>{record?.date}</RecordDate>
          <EditRecord
            onPress={() =>
              navigation.navigate("EditRecord", {
                record,
                exercises,
              })
            }
          >
            <EditText>Edit</EditText>
          </EditRecord>
        </RecordTitleContainer>
        {expanded[index] && (
          <WorkoutRecord recordExercises={record?.recordExercises} />
        )}
      </RecordContainer>
    );
  };

  return (
    <DismissKeyboard>
      <>
        {successMessageVisible ? (
          <SuccessMessage>{successMessage}</SuccessMessage>
        ) : null}

        <FlatList
          style={{ marginTop: 5, marginHorizontal: 10 }}
          data={records}
          keyExtractor={(item, index) => "" + index}
          renderItem={renderRecord}
          initialNumToRender={3}
          windowSize={2}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </>
    </DismissKeyboard>
  );
}
