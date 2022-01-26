import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import MainButton from "../components/MainButton";

const Container = styled.View`
  padding: 0px 15px;
`;

const ButtonContainer = styled.View`
  margin-top: 15px;
  padding: 0px 25px;
`;

const WorkoutInfo = styled.View``;

const InfoText = styled.Text`
  margin-top: 10px;
`;

const MyWorkout = styled.View``;

const ExerciseList = styled.View``;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightgray};
  margin-top: 20px;
  margin-bottom: 18px;
`;

export default function Workout({ navigation }) {
  return (
    <Container>
      <ButtonContainer>
        <WorkoutInfo>
          <InfoText>이전 워크아웃: </InfoText>
          <InfoText>다음 워크아웃: </InfoText>
        </WorkoutInfo>
        <MainButton
          text="다음 워크아웃 시작"
          // disabled={!watch("programTitle")}
          onPress={() => {}}
        />

        <MainButton
          text="빈 템플릿으로 시작"
          onPress={() => navigation.navigate("CreateWorkout")}
        />
      </ButtonContainer>
      <BorderLine />

      <MyWorkout>
        <InfoText>나의 운동 프로그램</InfoText>
        <TouchableOpacity onPress={() => navigation.navigate("SearchWorkout")}>
          <InfoText>더보기</InfoText>
        </TouchableOpacity>
        {/* <MyProgramCards programs={data?.me?.programs} /> */}
      </MyWorkout>
    </Container>
  );
}
