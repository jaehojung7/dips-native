import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import CloseButton from "../components/CloseButton";

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
    }
  }
`;

const SEE_PROGRAM_QUERY = gql`
  query seeProgram($id: Int!) {
    seeProgram(id: $id) {
      id
      user
      title
      # description
      # templates {
      #   title
      # }
      # isPrivate
      # likeCount
    }
  }
`;

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PopupView = styled.View`
  margin: 10px;
  border-radius: 5px;
  background-color: white;
  padding: 15px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 800;
`;

const TitleIcon = styled.Text`
  margin: 0 3px 0 7px;
  font-size: 14px;
  color: ${(props) => props.theme.blue};
`;

const InfoContainer = styled.View`
  /* align-items: center; */
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.darkgray};
  margin-top: 5px;
`;

const ButtonText = styled.Text`
  color: #797d7f;
  font-size: 14px;
  font-weight: 700;
  margin: 0 5px;
  text-align: center;
`;

export default function ProgramPopup({ modalVisible, setModalVisible }) {
  // const { data } = useQuery(SEE_PROGRAM_QUERY);
  const { data } = useQuery(ME_QUERY);
  console.log(data);
  return (
    <CenterView>
      <PopupView>
        <TitleContainer>
          <TitleText>{data?.me.programs[0].title}</TitleText>
          <TitleIcon>
            <FontAwesome name="star" size={14} />{" "}
            {data?.me.programs[0].likeCount}
          </TitleIcon>
          <TitleIcon>
            {data?.me.programs[0].isPrivate ? (
              <FontAwesome5 name="lock" size={14} />
            ) : (
              <FontAwesome5 name="globe" size={14} />
            )}
          </TitleIcon>
        </TitleContainer>

        <InfoContainer>
          <InfoText>{data?.me.programs[0].description}</InfoText>
          <InfoText>Day 1: Back + Chest + Arm 시작하기 Button</InfoText>
          <InfoText>Day 2: Back + Chest + Shoulder 시작하기 Button</InfoText>
          <InfoText>Day 3: Leg + Core 시작하기 Button</InfoText>
        </InfoContainer>
        <CloseButton
          text="닫기"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </PopupView>
    </CenterView>
  );
}
