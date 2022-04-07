import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm, Controller } from "react-hook-form";
import SaveProgramButton from "../components/Buttons/SaveProgramButton";
import DeleteProgramButton from "../components/Buttons/DeleteProgramButton";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 50px 15px 15px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProgramTitle = styled.TextInput`
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

const ExerciseTitle = styled.TextInput`
  font-size: 17px;
  font-weight: 500;
  color: ${(props) => props.theme.fontColor};
`;

const SetbyRepContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const defaultValues = {
  workouts: [
    {
      name: "",
      // workoutSets: [{ exercise: "", setCount: "" }],
    },
  ],
};

export default function EditProgram({ route }) {
  const { program } = route.params;
  const { register, handleSubmit, setValue, getValues, watch, control } =
    useForm({
      defaultValues: {
        programTitle: program?.title,
        // workoutTitle: program?.username,
      },
    });
  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Controller
            name="programTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ProgramTitle
                value={watch("programTitle")}
                placeholder="프로그램 이름"
                autoCapitalize="none"
                returnKeyType="next"
                placeholderTextColor="#999999"
                onChangeText={(text) => setValue("programTitle", text)}
              />
            )}
          />
        </HeaderContainer>

        {program?.workouts.map((workout, workoutIndex) => {
          return (
            <WorkoutContainer key={workoutIndex}>
              <WorkoutTitleContainer>
                <WorkoutTitle>{workout.title}</WorkoutTitle>
              </WorkoutTitleContainer>

              {workout?.workoutSets.map((workoutSet, workoutSetIndex) => {
                console.log(workoutSet);
                return (
                  <ExerciseContainer key={workoutSetIndex}>
                    <ExerciseSubContainer>
                      <ExerciseTitle>{workoutSet?.exercise}</ExerciseTitle>
                    </ExerciseSubContainer>

                    <SetbyRepContainer>
                      <ExerciseTitle>{workoutSet.setCount}</ExerciseTitle>
                      <ExerciseTitle> x </ExerciseTitle>
                      <ExerciseTitle>{workoutSet.repCount}</ExerciseTitle>
                    </SetbyRepContainer>
                  </ExerciseContainer>
                );
              })}
            </WorkoutContainer>
          );
        })}
        <ButtonContainer>
          <SaveProgramButton text="저장" />
          <DeleteProgramButton text="삭제" program={program} />
        </ButtonContainer>
      </Container>
    </DismissKeyboard>
  );
}
