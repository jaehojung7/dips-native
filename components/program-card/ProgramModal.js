import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import TextButton from "../TextButton";
import TitleContainer from "./TitleContainer";
import { TitleText } from "./TitleText";
import { TitleIcon } from "./TitleIcon";

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.5);
`;

const PopupView = styled.View`
  margin: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.darkgray};
  padding: 20px;
  min-width: 300px;
`;

const TitleTextBold = styled(TitleText)`
  font-weight: 800;
`;

const ContentsContainer = styled.View`
  /* align-items: center; */
  justify-content: center;
`;

const DescriptionTextModal = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.lightgray};
  margin-top: 5px;
`;

const WorkoutContainer = styled.View`
  /* align-items: center; */
  /* justify-content: center; */
`;

const WorkoutTitleText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

export default function ProgramModal({ program, setModalVisible }) {
  return (
    <CenterView>
      <PopupView>
        <TitleContainer>
          <TitleTextBold>{program.title}</TitleTextBold>
          <TitleIcon>
            <FontAwesome name="star" size={14} /> {program.likeCount}
          </TitleIcon>
          <TitleIcon>
            {program.isPrivate ? (
              <FontAwesome5 name="lock" size={14} />
            ) : (
              <FontAwesome5 name="globe" size={14} />
            )}
          </TitleIcon>
        </TitleContainer>

        <ContentsContainer>
          <DescriptionTextModal>{program.description}</DescriptionTextModal>

          <WorkoutContainer>
            {program.templates.map((template, index) => {
              return (
                <TitleContainer key={index}>
                  <WorkoutTitleText>{template.title}</WorkoutTitleText>
                  <TextButton text="시작하기" onPress={() => {}} />
                </TitleContainer>
              );
            })}
          </WorkoutContainer>
        </ContentsContainer>
        <TextButton
          text="닫기"
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </PopupView>
    </CenterView>
  );
}
