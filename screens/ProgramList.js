import { gql, useQuery } from "@apollo/client";
import { FlatList, Text } from "react-native";
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
  margin: 7px 10px;
  border: 1px solid #797d7f;
  border-radius: 5px;
  padding: 7px 10px;
  height: 35%;
  /* width: 80%; */
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProgramTitle = styled.Text`
  font-size: 15px;
  padding: 0 5px;
  color: ${(props) => props.theme.fontColor};
`;

const Likes = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.orange};
`;

const Private = styled.Text`
  margin: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.blue};
`;

const ProgramDescription = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  padding: 0 5px;
  color: ${(props) => props.theme.darkgray};
`;

export default function ProgramList() {
  const { data, loading } = useQuery(ME_QUERY);
  const renderProgram = ({ item: program }) => {
    return (
      <ProgramContainer>
        <TitleContainer>
          <ProgramTitle> {program.title}</ProgramTitle>
          <Private>
            {program.isPrivate ? (
              <FontAwesome5 name="lock" size={14} />
            ) : (
              <FontAwesome5 name="globe" size={14} />
            )}
          </Private>
        </TitleContainer>
        <ProgramDescription>{program.description}</ProgramDescription>
      </ProgramContainer>
    );
  };

  return (
    <FlatList
      horizontal
      // numColumns={2}
      // initialNumToRender={2}
      data={data?.me?.programs}
      keyExtractor={(program) => "" + program.id}
      renderItem={renderProgram}
    />
  );
}

// ProgramList.propTypes = {
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     hashtags: PropTypes.string,
//     isLiked: PropTypes.bool.isRequired,
//     likeCount: PropTypes.number.isRequired,

//   };
