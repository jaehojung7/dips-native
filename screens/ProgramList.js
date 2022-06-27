import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Header, HeaderContainer } from "../components/layouts/MainContainer";
import DismissKeyboard from "../components/DismissKeyboard";

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
  const headerComponent = (
    <HeaderContainer>
      <Header>{header}</Header>
    </HeaderContainer>
  );

  return (
    <DismissKeyboard>
      <FlatList
        style={{ marginTop: 5, marginHorizontal: 10 }}
        data={programs}
        keyExtractor={(item, index) => "" + index}
        renderItem={renderItem}
        initialNumToRender={3}
        windowSize={3}
        ListHeaderComponent={headerComponent}
      />
    </DismissKeyboard>
  );
}
