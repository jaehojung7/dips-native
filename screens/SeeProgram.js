import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Switch, Alert } from "react-native";
import StartWorkoutButton from "../components/Buttons/StartWorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 50px 15px 5px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProgramTitle = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
  width: 85%;
`;

const InfoContainer = styled.View`
  margin: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const InfoText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  font-weight: 500;
`;

const LikeContainer = styled.TouchableOpacity`
  margin: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EditProgram = styled.TouchableOpacity`
  color: ${(props) => props.theme.fontColor};
`;

const EditText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 16px;
  font-weight: 600;
`;

const WorkoutContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 25px;
`;

const WorkoutTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const WorkoutTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  width: 70%;
`;

const ExerciseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ExerciseTitleContainer = styled.View`
  width: 70%;
`;

const SetbyRepContainer = styled.View`
  flex-direction: row;
`;

const ExerciseTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

const ToggleContainer = styled.View`
  margin: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ToggleText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-weight: 500;
  font-size: 15px;
  margin-right: 5px;
`;

const ToggleInfoContainer = styled.TouchableOpacity`
  margin-left: 20px;
`;

const ToggleInfoText = styled.Text`
  color: ${(props) => props.theme.mainColor};
`;

export default function SeeProgram({ route, navigation }) {
  const { program } = route.params;
  const { exercises } = route.params;
  const { directStart } = route.params;
  const [isLiked, setIsLiked] = useState(program.isLiked);

  const toggleLikeUpdate = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      setIsLiked((previousState) => !previousState);
      // cache.modify({
      //   id: `Program:${program.id}`,
      //   fields: {
      //     isLiked(prev) {
      //       return !prev;
      //     },
      //   },
      // });
    }
  };

  const [toggleLikeFunction] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id: program.id,
    },
    update: toggleLikeUpdate,
  });
  const toggleSwitch = toggleLikeFunction;

  const onClickAlert = () => {
    Alert.alert(
      "Favorite program",
      "Start this workout in Settings > Favorite programs"
    );
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          {program.isMine ? (
            <EditProgram
              onPress={() =>
                navigation.navigate("EditProgram", { program, exercises })
              }
            >
              <EditText>Edit</EditText>
            </EditProgram>
          ) : null}
        </HeaderContainer>

        {program.isMine ? (
          <InfoContainer>
            <InfoContainer>
              <InfoText>
                <FontAwesome name="user" size={14} />
              </InfoText>
              <InfoText style={{ marginLeft: 7 }}>My program</InfoText>
            </InfoContainer>

            <InfoContainer>
              {program.isPublic ? (
                <>
                  <InfoText>
                    <FontAwesome5 name="lock-open" size={14} />
                  </InfoText>
                  <InfoText style={{ marginLeft: 7 }}>Public</InfoText>
                </>
              ) : (
                <>
                  <InfoText>
                    <FontAwesome5 name="lock" size={14} />
                  </InfoText>
                  <InfoText style={{ marginLeft: 7 }}>Private</InfoText>
                </>
              )}
            </InfoContainer>
          </InfoContainer>
        ) : (
          <ToggleContainer>
            <ToggleText>Favorite program</ToggleText>
            <Switch
              style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
              onValueChange={toggleSwitch}
              value={isLiked}
            />
            <ToggleInfoContainer onPress={onClickAlert}>
              <ToggleInfoText>
                <FontAwesome5 name="info-circle" size={20} />
              </ToggleInfoText>
            </ToggleInfoContainer>
          </ToggleContainer>
          // <LikeContainer onPress={toggleLikeFunction}>
          //   {program.isLiked ? (
          //     <>
          //       <InfoText>
          //         <FontAwesome name="star" size={16} />
          //       </InfoText>
          //       <InfoText style={{ marginLeft: 7 }}>Unlike</InfoText>
          //     </>
          //   ) : (
          //     <>
          //       <InfoText>
          //         <FontAwesome name="star-o" size={16} />
          //       </InfoText>
          //       <InfoText style={{ marginLeft: 7 }}>Like</InfoText>
          //     </>
          //   )}
          // </LikeContainer>
        )}

        {program?.workouts.map((workout, workoutIndex) => {
          return (
            <WorkoutContainer key={workoutIndex}>
              <WorkoutTitleContainer>
                <WorkoutTitle>{workout.title}</WorkoutTitle>
                {directStart ? (
                  <StartWorkoutButton
                    text="Start"
                    onPress={() => {
                      navigation.navigate("CreateRecord", {
                        baseProgramId: program?.id,
                        programTitle: program?.title,
                        workout,
                        exercises,
                      }),
                        { ...{ navigation } };
                    }}
                  />
                ) : null}
              </WorkoutTitleContainer>

              {workout?.workoutSets.map((workoutSet, workoutSetIndex) => {
                return (
                  <ExerciseContainer key={workoutSetIndex}>
                    <ExerciseTitleContainer>
                      <ExerciseTitle>{workoutSet?.exercise}</ExerciseTitle>
                    </ExerciseTitleContainer>

                    <SetbyRepContainer>
                      <ExerciseTitle>{workoutSet.setCount}</ExerciseTitle>
                      <ExerciseTitle> x </ExerciseTitle>
                      <ExerciseTitle>{workoutSet.repCount}</ExerciseTitle>
                    </SetbyRepContainer>
                  </ExerciseContainer>
                );
              })}
            </WorkoutContainer>
          );
        })}
      </Container>
    </DismissKeyboard>
  );
}
