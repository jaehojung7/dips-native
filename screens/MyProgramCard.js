import { gql, useQuery } from "@apollo/client";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import ProgramPopup from "../components/ProgramPopup";
import CloseButton from "../components/CloseButton";

const SEE_PROGRAM_QUERY = gql`
  query seeProgram($id: Int!) {
    seeProgram(id: $id) {
      user
      title
      description
      templates {
        title
      }
      isPrivate
      likeCount
    }
  }
`;

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
  margin: 5px 5px 20px 5px;
  border: 1px solid #797d7f;
  border-radius: 5px;
  padding: 10px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CenterView = styled.View`
  background-color: yellow;
  align-items: center;
  justify-content: center;
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

export default function MyProgramCard() {
  const { data, loading } = useQuery(SEE_PROGRAM_QUERY);
  // console.log(data?.me?.programs[0]?.title);
  // console.log(data?.me);
  const [modalVisible, setModalVisible] = useState(false);
  const renderProgram = ({ item: program }) => {
    return (
      <ProgramContainer>
        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <ProgramPopup {...{ modalVisible, setModalVisible }} />
        </Modal>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <TitleContainer>
            <TitleText> {program.title}</TitleText>
            <TitleIcon>
              {program.isPrivate ? (
                <FontAwesome5 name="lock" size={14} />
              ) : (
                <FontAwesome5 name="globe" size={14} />
              )}
            </TitleIcon>
          </TitleContainer>
          <DescriptionText>{program.description}</DescriptionText>
        </TouchableOpacity>
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

// ProgramList.propTypes = {
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     hashtags: PropTypes.string,
//     isLiked: PropTypes.bool.isRequired,
//     likeCount: PropTypes.number.isRequired,

//   };
