import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import TextButton from "./TextButton";

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

const ContentsContainer = styled.View`
  /* align-items: center; */
  justify-content: center;
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.darkgray};
  margin-top: 5px;
`;

const WorkoutContainer = styled.View`
  /* align-items: center; */
  /* justify-content: center; */
`;

const WorkoutTitleContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const WorkoutTitleText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  margin-top: 5px;
`;

const ButtonText = styled.Text`
  color: #797d7f;
  font-size: 14px;
  font-weight: 700;
  margin: 0 5px;
  text-align: center;
`;

export default function ProgramPopup({
  modalVisible,
  setModalVisible,
  programs,
}) {
  console.log(programs);
  return (
    <CenterView>
      {programs.map((program, index) => {
        return (
          <PopupView key={index}>
            <TitleContainer>
              <TitleText>{program.title}</TitleText>
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
              <DescriptionText>{program.description}</DescriptionText>

              <WorkoutContainer>
                {program.templates.map((workout, index) => {
                  return (
                    <WorkoutTitleContainer key={index}>
                      <WorkoutTitleText>{workout.title}</WorkoutTitleText>
                      <TextButton text="시작하기" onPress={() => {}} />
                    </WorkoutTitleContainer>
                  );
                })}
              </WorkoutContainer>
            </ContentsContainer>
            <TextButton
              text="닫기"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </PopupView>
        );
      })}
    </CenterView>
  );
}
