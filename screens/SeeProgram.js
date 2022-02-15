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

const ProgramTitle = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
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
  width: 50%;
`;

const ExerciseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ExerciseSubContainer = styled.View`
  width: 50%;
`;

const ExerciseTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: ${(props) => props.theme.fontColor};
`;

const SetsbyReps = styled(ExerciseTitle)`
  text-align: right;
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
          <ProgramTitle>{program.title}</ProgramTitle>
        </HeaderContainer>

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
                <ExerciseSubContainer>
                  <ExerciseTitle>스쿼트</ExerciseTitle>
                </ExerciseSubContainer>
                <ExerciseSubContainer>
                  <SetsbyReps>5x5</SetsbyReps>
                </ExerciseSubContainer>
              </ExerciseContainer>

              <ExerciseContainer>
                <ExerciseSubContainer>
                  <ExerciseTitle>벤치프레스</ExerciseTitle>
                </ExerciseSubContainer>
                <ExerciseSubContainer>
                  <SetsbyReps>5x5</SetsbyReps>
                </ExerciseSubContainer>
              </ExerciseContainer>

              <ExerciseContainer>
                <ExerciseSubContainer>
                  <ExerciseTitle>바벨로우</ExerciseTitle>
                </ExerciseSubContainer>
                <ExerciseSubContainer>
                  <SetsbyReps>5x5</SetsbyReps>
                </ExerciseSubContainer>
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
