import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator, RefreshControl } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { logUserOut } from "../apollo";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { DeviceEventEmitter } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Container } from "../components/layouts/MainContainer";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      email
      programs {
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
      exercises {
        id
        exercise
        bodyPart
      }
      likes {
        program {
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
    }
  }
`;

const ProfileContainer = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
`;

const ProfileText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 7px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

const IndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const ListTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ListText = styled.Text`
  padding: 15px;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function Setting({ navigation }) {
  const { data, loading, refetch } = useQuery(ME_QUERY);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading)
    return (
      <IndicatorContainer>
        <ActivityIndicator />
      </IndicatorContainer>
    );

  const programs = data?.me.programs;
  const likes = data?.me.likes.map((like) => like.program);
  const exercises = data?.me.exercises;

  DeviceEventEmitter.addListener(
    "event.deleteProgram",
    async (data) => await refetch()
  );

  DeviceEventEmitter.addListener(
    "event.toggleLike",
    async (data) => await refetch()
  );

  DeviceEventEmitter.addListener(
    "event.createExercise",
    async (data) => await refetch()
  );

  return (
    <DismissKeyboard>
      <Container
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileContainer>
          <ProfileText>{data?.me.username}</ProfileText>
          <ProfileText style={{ marginBottom: 0 }}>
            {data?.me.email}
          </ProfileText>
        </ProfileContainer>

        <View style={{ marginBottom: 30 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProgramList", {
                programs,
                exercises,
                header: "My Programs",
              })
            }
          >
            <ListTextContainer>
              <ListText>My programs</ListText>
              <ListText>
                <FontAwesome5 name="angle-right" size={16} />
              </ListText>
            </ListTextContainer>
            <BorderLine />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProgramList", {
                programs: likes,
                exercises,
                header: "Favorite Programs",
              })
            }
          >
            <ListTextContainer>
              <ListText>Favorite programs</ListText>
              <ListText>
                <FontAwesome5 name="angle-right" size={16} />
              </ListText>
            </ListTextContainer>
            <BorderLine />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ExerciseList", {
                userId: data?.me.id,
                exercises,
              });
            }}
          >
            <ListTextContainer>
              <ListText>My exercises</ListText>
              <ListText>
                <FontAwesome5 name="angle-right" size={16} />
              </ListText>
            </ListTextContainer>
            <BorderLine />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => logUserOut()}>
          <ButtonText>Logout</ButtonText>
        </TouchableOpacity>
      </Container>
    </DismissKeyboard>
  );
}
