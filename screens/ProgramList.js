import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";

const Container = styled.View`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 50px 15px 10px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

const TitleContainer = styled.TouchableOpacity`
  justify-content: space-between;
  margin: 10px;
`;

const ProgramTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function ProgramList({ route, navigation }) {
  const { programs } = route.params;
  const { exercises } = route.params;
  const { header } = route.params;
  const renderItem = ({ item: program }) => {
    return (
      <>
        <TitleContainer
          onPress={() => {
            navigation.navigate("SeeProgram", {
              program,
              exercises,
              directStart: true,
            });
          }}
        >
          <ProgramTitle>{program.title}</ProgramTitle>
        </TitleContainer>
        <BorderLine />
      </>
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <Header>{header}</Header>
      </HeaderContainer>
      <FlatList
        data={programs}
        keyExtractor={(item, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={3}
        windowSize={3}
      />
    </Container>
  );
}
