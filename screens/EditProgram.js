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

const WorkoutTitle = styled.TextInput`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.fontColor};
`;

const ExerciseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ExerciseTitleContainer = styled.View`
  width: 50%;
  border: 1px solid blue;
`;

const ExerciseTitle = styled.TextInput`
  font-size: 17px;
  font-weight: 500;
  color: ${(props) => props.theme.fontColor};
`;

const SetbyRepContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: space-evenly; */
  border: 1px solid black;
  width: 40%;
`;

const SetbyRep = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5px;
  text-align: center;
  width: 40%;
`;

const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  font-weight: 500;
  margin: 0 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default function EditProgram({ route }) {
  const { handleSubmit, setValue, getValues, watch, control } = useForm({});
  const { program } = route.params;

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
                defaultValue={program.title}
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
              <Controller
                name="workoutTitle"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <WorkoutTitle
                    value={watch("workoutTitle")}
                    placeholder="워크아웃 이름"
                    defaultValue={workout.title}
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor="#999999"
                    onChangeText={(text) => setValue("workoutTitle", text)}
                  />
                )}
              />

              {workout?.workoutSets.map((workoutSet, workoutSetIndex) => {
                return (
                  <ExerciseContainer key={workoutSetIndex}>
                    <ExerciseTitleContainer>
                      {/* <Controller
                        name="exerciseTitle"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <ExerciseTitle
                            value={watch("exerciseTitle")}
                            placeholder="운동 이름"
                            defaultValue={workoutSet ? exercise : ""}
                            autoCapitalize="none"
                            returnKeyType="next"
                            placeholderTextColor="#999999"
                            onChangeText={(text) =>
                              setValue("exerciseTitle", text)
                            }
                          />
                        )}
                      /> */}
                    </ExerciseTitleContainer>

                    <SetbyRepContainer>
                      {/* <ExerciseTitle>{workoutSet.setCount}</ExerciseTitle> */}
                      <Controller
                        name="exerciseSets"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <SetbyRep
                            // value={watch("exerciseSets")}
                            keyboardType="numeric"
                            type="number"
                            defaultValue={workoutSet.setCount.toString()}
                            maxLength={3}
                            placeholderTextColor="#999999"
                            onChangeText={(text) =>
                              setValue("exerciseSets", text)
                            }
                          />
                        )}
                      />
                      <IndexText>x</IndexText>
                      <Controller
                        name="exerciseReps"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <SetbyRep
                            keyboardType="numeric"
                            type="number"
                            // placeholder={workoutSet.repCount}
                            defaultValue={workoutSet.repCount.toString()}
                            maxLength={3}
                            placeholderTextColor="#999999"
                            onChangeText={(text) =>
                              setValue("exerciseReps", text)
                            }
                          />
                        )}
                      />
                    </SetbyRepContainer>
                  </ExerciseContainer>
                );
              })}
            </WorkoutContainer>
          );
        })}
        <ButtonContainer>
          <SaveProgramButton
            text="저장"
            program={program}
            {...{ handleSubmit, getValues }}
          />
          <DeleteProgramButton text="삭제" program={program} />
        </ButtonContainer>
      </Container>
    </DismissKeyboard>
  );
}
