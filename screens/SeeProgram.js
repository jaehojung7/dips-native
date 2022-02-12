import CloseButton from "../components/modal-components/CloseButton";
import StartWorkoutButton from "../components/Buttons/StartWorkoutButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.ScrollView`
  margin: 20px 10px;
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

const ProgramDescription = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

const WorkoutContainer = styled.View`
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  padding: 15px 25px;
`;

const WorkoutTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
`;

const ExerciseContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* padding: 0 3px; */
`;

const ExerciseTitleContainer = styled.View`
  margin-top: 15px;
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
        {/* <Header>프로그램 보기</Header> */}
        <TitleContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          {/* <ProgramDescription>{program.description}</ProgramDescription> */}
        </TitleContainer>

        {program?.templates.map((workout, workoutIndex) => {
          return (
            <WorkoutContainer key={workoutIndex}>
              {/* <WorkoutTitle>워크아웃 {workoutIndex + 1}</WorkoutTitle> */}
              <WorkoutTitle>{workout.title}</WorkoutTitle>
              <ExerciseContainer>
                <ExerciseTitleContainer>
                  <ExerciseTitle>스쿼트</ExerciseTitle>
                  <ExerciseTitle>데드리프트</ExerciseTitle>
                  <ExerciseTitle>밀리터리프레스</ExerciseTitle>
                  <ExerciseTitle>벤치프레스</ExerciseTitle>
                  <ExerciseTitle>바벨로우</ExerciseTitle>
                </ExerciseTitleContainer>

                {/* {workout?.templateSets.map((exercise, exerciseIndex) => {
                return (
                  <ExerciseContainer key={exerciseIndex}>
                    <ExerciseTitle>{exercise}</ExerciseTitle>)
                  </ExerciseContainer>
                );
              })} */}
                <StartWorkoutButton
                  text="워크아웃 시작"
                  onPress={() => {
                    navigation.navigate("CreateWorkout", { workout });
                  }}
                />
              </ExerciseContainer>
            </WorkoutContainer>
          );
        })}
      </Container>
    </DismissKeyboard>
  );
}
