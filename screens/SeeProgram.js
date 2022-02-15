import CloseButton from "../components/modal-components/CloseButton";
import StartWorkoutButton from "../components/Buttons/StartWorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 30px 15px 15px 15px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const TitleContainer = styled.View`
  margin-bottom: 15px;
  padding: 15px 25px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
`;

const ProgramTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 22px;
  font-weight: 700;
  /* margin-bottom: 10px; */
`;

const WorkoutContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 25px;
`;

const WorkoutTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const WorkoutTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

const ExerciseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ExerciseTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
`;

const defaultValues = {
  templates: [
    {
      name: "",
      templateSets: [{ exercise: "", setCount: "" }],
    },
  ],
};

export default function SeeProgram({ route, navigation }) {
  const { program } = route.params;
  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Header>프로그램</Header>
        </HeaderContainer>
        <TitleContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
        </TitleContainer>

        {program?.templates.map((workout, workoutIndex) => {
          return (
            <WorkoutContainer key={workoutIndex}>
              <WorkoutTitleContainer>
                <WorkoutTitle>{workout.title}</WorkoutTitle>
                <StartWorkoutButton
                  text="워크아웃 시작"
                  onPress={() => {
                    navigation.navigate("StackWorkout", { workout });
                  }}
                />
              </WorkoutTitleContainer>

              <ExerciseContainer>
                <ExerciseTitle>스쿼트</ExerciseTitle>
                <ExerciseTitle>5x5</ExerciseTitle>
              </ExerciseContainer>

              <ExerciseContainer>
                <ExerciseTitle>벤치프레스</ExerciseTitle>
                <ExerciseTitle>5x5</ExerciseTitle>
              </ExerciseContainer>

              <ExerciseContainer>
                <ExerciseTitle>바벨로우</ExerciseTitle>
                <ExerciseTitle>5x5</ExerciseTitle>
              </ExerciseContainer>

              <ExerciseContainer>
                <ExerciseTitle>오버헤드프레스</ExerciseTitle>
                <ExerciseTitle>5x5</ExerciseTitle>
              </ExerciseContainer>

              <ExerciseContainer>
                <ExerciseTitle>데드리프트</ExerciseTitle>
                <ExerciseTitle>5x5</ExerciseTitle>
              </ExerciseContainer>
              {/* {workout?.templateSets.map((exercise, exerciseIndex) => {
                return (
                  <ExerciseContainer key={exerciseIndex}>
                    <ExerciseTitle>{exercise}</ExerciseTitle>)
                  </ExerciseContainer>
                );
              })} */}
            </WorkoutContainer>
          );
        })}
      </Container>
    </DismissKeyboard>
  );
}
