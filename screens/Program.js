import React from "react";
import { ActivityIndicator } from "react-native";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import ProgramCards from "../components/ProgramCards";

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 20px 15px 15px 5px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

const RecentProgramContainer = styled.TouchableOpacity`
  padding: 25px 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
`;

const RecentTitle = styled.Text`
  font-size: 19px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 10px;
`;

const ProgramTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${(props) => props.theme.mainColor};
`;

const WorkoutTitle = styled.Text`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
`;

const ProgramContainer = styled.View`
  margin: 15px 0;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FavoritePrograms = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  padding: 0 5px;
`;

const MoreProgram = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
`;

const ButtonContainer = styled.View`
  margin: 15px 0;
  justify-content: space-between;
`;

export default function Program({ navigation, route }) {
  const { data, loading } = route.params;
  console.log(data);
  const directStart = true;
  // if (loading)
  //   return (
  //     <IndicatorContainer>
  //       <ActivityIndicator />
  //     </IndicatorContainer>
  //   );
  const programs = data?.me.programs;
  const exercises = data?.me.exercises;
  const recentProgram = data?.me.recentProgram;
  const recentWorkoutIndex = data?.me.recentWorkoutIndex;
  let nextWorkoutIndex = 0;
  if (recentWorkoutIndex < recentProgram?.workouts.length - 1) {
    nextWorkoutIndex = recentWorkoutIndex + 1;
  } else {
    nextWorkoutIndex = 0;
  }
  const likes = data?.me.likes.map((like) => like.program);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderContainer>
        <Header>Programs</Header>
      </HeaderContainer>
      <RecentProgramContainer
        onPress={() => {
          recentProgram
            ? navigation.navigate("SeeProgram", {
                program: recentProgram,
                exercises,
                directStart,
              })
            : navigation.navigate("CreateProgram", { exercises });
        }}
      >
        <RecentTitle>Recent Program</RecentTitle>

        <ProgramTitle>
          {recentProgram ? recentProgram?.title : "없음"}{" "}
        </ProgramTitle>
        {recentProgram ? (
          <>
            <WorkoutTitle>
              Recent workout:{" "}
              {recentProgram?.workouts[recentWorkoutIndex].title}
            </WorkoutTitle>
            <WorkoutTitle>
              Next workout: {recentProgram?.workouts[nextWorkoutIndex].title}
            </WorkoutTitle>
          </>
        ) : (
          <WorkoutTitle></WorkoutTitle>
        )}
      </RecentProgramContainer>
      <ButtonContainer>
        <MainButton
          text="Start an empty workout"
          onPress={() => navigation.navigate("CreateRecord", { exercises })}
        />
      </ButtonContainer>
      <ProgramContainer>
        <TitleContainer>
          <FavoritePrograms>My Programs</FavoritePrograms>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProgramList", {
                programs,
                exercises,
                header: "My Programs",
              })
            }
          >
            <MoreProgram>More</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <ProgramCards programs={programs} exercises={exercises} />
      </ProgramContainer>

      <ProgramContainer>
        <TitleContainer>
          <FavoritePrograms>Favorite Programs</FavoritePrograms>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProgramList", {
                programs: likes,
                exercises,
                header: "Favorite Programs",
              })
            }
          >
            <MoreProgram>More</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <ProgramCards programs={likes} exercises={exercises} />
      </ProgramContainer>

      <MainButton
        text="Create a new program"
        disabled={false}
        onPress={() => navigation.navigate("CreateProgram", { exercises })}
      />
    </Container>
  );
}
