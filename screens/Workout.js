import React from "react";
import styled from "styled-components/native";
import MainButton from "../components/MainButton";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  margin-top: 15px;
`;

const ButtonContainer = styled.View``;

const SavedWorkout = styled.View`
  flex-direction: row;
`;

const WorkoutInfo = styled.View``;

const InfoText = styled.Text``;

const ExerciseList = styled.View``;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightgray};
  margin-top: 10px;
  margin-bottom: 18px;
`;

export default function Workout({ navigation }) {
  return (
    <Container>
      <ButtonContainer>
        <SavedWorkout>
          <WorkoutInfo>
            <InfoText>{/* 이전 워크아웃: data?. */}</InfoText>
            <InfoText>{/* 다음 워크아웃: data?. */}</InfoText>
          </WorkoutInfo>
          <MainButton
            text="다음 워크아웃 시작"
            // disabled={!watch("programTitle")}
            onPress={() => {}}
          />
        </SavedWorkout>

        <MainButton
          text="빈 템플릿으로 시작"
          onPress={() => navigation.navigate("NewWorkout")}
        />
      </ButtonContainer>

      <BorderLine />
      <SavedWorkout>
        {/* <ProgramTitle>나의 운동 프로그램</ProgramTitle>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MoreProgram>더보기</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <MyProgramCards programs={data?.me?.programs} /> */}
      </SavedWorkout>
      <BorderLine />

      <ExerciseList>{/* 운동보기 Exercise List */}</ExerciseList>
    </Container>
  );
}
