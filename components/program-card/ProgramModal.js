import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import CloseButton from "./CloseButton";
import StartButton from "./StartButton";
import styled from "styled-components/native";

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PopupView = styled.View`
  margin: 10px;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  min-width: 300px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProgramTitle = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: 700;
  margin-right: 10px;
`;

const TitleIcon = styled.Text`
  color: ${(props) => props.theme.blue};
`;

const Description = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: ${(props) => props.theme.darkgray};
`;

const WorkoutContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const WorkoutTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: black;
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightgray};
  margin-top: 10px;
  margin-bottom: 15px;
`;

export default function ProgramModal({ program, setModalVisible }) {
  return (
    <CenterView>
      <PopupView>
        <HeaderContainer>
          <TitleContainer>
            <ProgramTitle>{program.title}</ProgramTitle>
            <TitleIcon>
              {program.isPrivate ? (
                <FontAwesome5 name="lock" size={14} />
              ) : (
                <FontAwesome5 name="globe" size={14} />
              )}
            </TitleIcon>
          </TitleContainer>

          <TitleIcon>
            <FontAwesome name="star" size={15} /> {program.likeCount}
          </TitleIcon>

          <CloseButton
            text="닫기"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </HeaderContainer>

        <Description>{program.description}</Description>
        <BorderLine />

        <>
          {program.templates.map((template, index) => {
            return (
              <WorkoutContainer key={index}>
                <WorkoutTitle>{template.title}</WorkoutTitle>
                <StartButton text="워크아웃 시작" onPress={() => {}} />
              </WorkoutContainer>
            );
          })}
        </>
      </PopupView>
    </CenterView>
  );
}
