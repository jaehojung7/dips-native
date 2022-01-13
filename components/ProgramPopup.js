import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";

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
`;

const TitleIcon = styled.Text`
  margin: 0 3px 0 7px;
  font-size: 14px;
  color: ${(props) => props.theme.blue};
`;

const InfoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.darkgray};
`;

export default function ProgramPopup() {
  //   const { data } = useQuery(SEE_PROGRAM_QUERY);
  const { data } = useQuery(ME_QUERY);
  //   console.log(data);
  return (
    <CenterView>
      <PopupView>
        <TitleContainer>
          <TitleText> Title </TitleText>
          {/* <TitleText> {data.title}</TitleText> */}
          {/* <TitleIcon>
              {program.isPrivate ? (
                <FontAwesome5 name="lock" size={14} />
              ) : (
                <FontAwesome5 name="globe" size={14} />
              )}
            </TitleIcon>
            <TitleIcon>
              <FontAwesome name="star" size={14} /> {program.likeCount}
            </TitleIcon> */}
        </TitleContainer>

        <InfoContainer>
          {/* <InfoText>{program.description}</InfoText> */}
          {/* <InfoText>{program.template.templateIndex[0].title}</InfoText> */}
        </InfoContainer>
      </PopupView>
    </CenterView>
  );
}
