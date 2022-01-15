import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const ProgramContainer = styled.View`
  justify-content: center;
  margin: 5px 5px 15px 5px;
  border: 1px solid #797d7f;
  border-radius: 5px;
  padding: 10px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.fontColor};
`;

const TitleIcon = styled.Text`
  margin: 0 3px 0 7px;
  font-size: 14px;
  color: ${(props) => props.theme.blue};
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  margin-top: 7px;
  padding-left: 4px;
  color: ${(props) => props.theme.darkgray};
`;

export default function FavProgramCard({ likes }) {
  const renderProgram = ({ item: like }) => {
    return (
      <ProgramContainer>
        <TitleContainer>
          <TitleText> {like.program.title}</TitleText>
          <TitleIcon>
            <FontAwesome name="star" size={14} /> {like.program.likeCount}
          </TitleIcon>
        </TitleContainer>
        <DescriptionText>{like.program.description}</DescriptionText>
      </ProgramContainer>
    );
  };

  return (
    <FlatList
      data={likes}
      keyExtractor={(like) => "" + like.id}
      renderItem={renderProgram}
      horizontal
      initialNumToRender={3}
      windowSize={3}
    />
  );
}
