import CloseButton from "../components/modal-components/CloseButton";
import StartButton from "../components/modal-components/StartButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const TitleContainer = styled.View`
  margin-bottom: 15px;
  padding: 0 15px;
  /* background-color: ${(props) => props.theme.cardColor}; */
  /* border-radius: 20px; */
`;

const Header = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  padding: 0 15px;
  color: ${(props) => props.theme.fontColor};
`;

const ProgramTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ProgramDescription = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

const WorkoutContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 20px;
`;

const WorkoutTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const ExerciseContainer = styled.View`
  margin: 10px 0;
`;

const ExerciseTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
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
        <TitleContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <ProgramDescription>{program.description}</ProgramDescription>
        </TitleContainer>

        {program?.templates.map((workout, workoutIndex) => {
          // console.log(workout);
          return (
            <WorkoutContainer key={workoutIndex}>
              <WorkoutTitle>
                워크아웃 {workoutIndex + 1}. {workout.title}
              </WorkoutTitle>
              <ExerciseContainer>
                <ExerciseTitle>
                  스쿼트 데드리프트 밀리터리프레스 딥스 인클라인 벤치프레스
                </ExerciseTitle>
              </ExerciseContainer>

              {/* {workout?.templateSets.map((exercise, exerciseIndex) => {
                return (
                  <ExerciseContainer key={exerciseIndex}>
                    <ExerciseTitle>{exercise}</ExerciseTitle>)
                  </ExerciseContainer>
                );
              })} */}
              <StartButton
                text="워크아웃 시작"
                onPress={() => {
                  navigation.navigate("CreateWorkout", { workout });
                }}
              />
            </WorkoutContainer>
          );
        })}
      </Container>
    </DismissKeyboard>
  );
}
