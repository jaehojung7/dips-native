import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import MainButton from "../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import MyProgramCards from "../components/modal-components/MyProgramCards";
import FavProgramCards from "../components/modal-components/FavProgramCards";

const ME_QUERY = gql`
  query me {
    me {
      programs {
        id
        title
        description
        isPrivate
        likeCount
        templates {
          title
        }
      }
      likes {
        program {
          id
          title
          description
          isPrivate
          likeCount
          templates {
            title
          }
        }
      }
    }
  }
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  margin-top: 15px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProgramTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin: 10px 5px 10px 5px;
  color: ${(props) => props.theme.fontColor};
`;

const MoreProgram = styled.Text`
  font-weight: 700;
  color: ${(props) => props.theme.blue};
`;

export default function Program({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  return (
    <Container>
      <ScrollView>
        <TitleContainer>
          <ProgramTitle>나의 운동 프로그램</ProgramTitle>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MoreProgram>더보기</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <MyProgramCards programs={data?.me?.programs} />

        <TitleContainer>
          <ProgramTitle>즐겨찾는 프로그램</ProgramTitle>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MoreProgram>더보기</MoreProgram>
          </TouchableOpacity>
        </TitleContainer>
        <FavProgramCards likes={data?.me?.likes} />

        <MainButton
          text="새 프로그램 만들기"
          disabled={false}
          onPress={() => navigation.navigate("CreateProgram")}
        />
      </ScrollView>
    </Container>
  );
}
