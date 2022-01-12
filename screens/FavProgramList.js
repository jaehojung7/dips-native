import { gql, useQuery } from "@apollo/client";
import { FlatList, ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const ME_QUERY = gql`
  query me {
    me {
      programs {
        id
        title
        description
        isPrivate
        likeCount
      }
    }
  }
`;

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

const ProgramTitle = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.fontColor};
`;

const Favorite = styled.Text`
  margin: 0 3px 0 7px;
  font-size: 14px;
  color: ${(props) => props.theme.blue};
`;

const ProgramDescription = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.darkgray};
`;

export default function FavProgramList() {
  const { data, loading } = useQuery(ME_QUERY);
  const renderProgram = ({ item: program }) => {
    return (
      <ProgramContainer>
        <TitleContainer>
          <ProgramTitle> {program.title}</ProgramTitle>
          <Favorite>
            <FontAwesome name="star" size={14} /> {program.likeCount}
          </Favorite>
        </TitleContainer>
        <ProgramDescription>{program.description}</ProgramDescription>
      </ProgramContainer>
    );
  };

  return (
    <FlatList
      data={data?.me?.programs}
      keyExtractor={(program) => "" + program.id}
      renderItem={renderProgram}
      horizontal
      initialNumToRender={3}
      windowSize={3}
    />
  );
}
