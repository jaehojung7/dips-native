import CloseButton from "./CloseButton";
import StartButton from "./StartButton";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const CenterView = styled.View`
  /* flex: 1;
  align-items: center;
  justify-content: center; */
`;

const PopupView = styled.View`
  /* border-radius: 15px;
  background-color: ${(props) => props.theme.lightgray};
  padding: 20px;
  width: 90%; */
`;

const HeaderContainer = styled.View`
  /* flex-direction: row; */
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
  margin-bottom: 18px;
`;

export default function ProgramModal({ program, navigation }) {
  return (
    <CenterView>
      <PopupView>
        <HeaderContainer>
          <TitleContainer>
            <ProgramTitle>{program?.title}</ProgramTitle>
            <ProgramTitle>3분할 프로그램</ProgramTitle>
          </TitleContainer>

          <CloseButton
            text="닫기"
            onPress={() => navigation.navigate("SearchProgram")}
          />
        </HeaderContainer>

        <Description>{program?.description}</Description>
        <BorderLine />

        <>
          {program?.templates.map((template, index) => {
            return (
              <WorkoutContainer key={index}>
                <WorkoutTitle>{template.title}</WorkoutTitle>
                <StartButton
                  text="워크아웃 시작"
                  onPress={() => {
                    navigation.navigate("CreateWorkout");
                  }}
                />
              </WorkoutContainer>
            );
          })}
        </>
      </PopupView>
    </CenterView>
  );
}
