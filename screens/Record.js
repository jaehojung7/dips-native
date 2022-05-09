import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
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
          recordExerciseIndex
          exercise
          recordExerciseSets {
            # recordExerciseId
            recordExerciseSetIndex
            weight
            repCount
          }
        }
      }
    }
  }
`;

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const RecordContainer = styled.ScrollView`
  /* margin: 20px 10px; */
`;

const HeaderContainer = styled.View`
  margin: 30px 15px 15px 15px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;

const DateContainer = styled.View`
  margin: 10px 0 15px 15px;
`;

const DateText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

export default function Record({ navigation }) {
  const { data } = useQuery(ME_QUERY);
  console.log(data);
  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Header>운동기록</Header>
        </HeaderContainer>
        {data?.me?.records.map((record, recordIndex) => {
          return (
            <RecordContainer key={recordIndex}>
              <DateContainer>
                <DateText>{record.title}</DateText>
              </DateContainer>

              <MainContainer>
                <WorkoutRecord recordExercises={record.recordExercises} />
              </MainContainer>
            </RecordContainer>
          );
        })}
      </Container>
    </DismissKeyboard>
  );
}
