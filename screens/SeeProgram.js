import CloseButton from "../components/modal-components/CloseButton";
import StartButton from "../components/modal-components/StartButton";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const TitleContainer = styled.View`
  margin-bottom: 15px;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
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

const ExerciseTitle = styled.TextInput`
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

export default function SeeProgram({ route }) {
  const { program } = route.params;
  console.log(program);
  const { handleSubmit, setValue, getValues, control, watch, setError } =
    useForm({
      defaultValues,
    });

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <TitleContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <ProgramDescription>{program.description}</ProgramDescription>
        </TitleContainer>

        {program?.templates.map((workout, workoutIndex) => {
          console.log(workout);
          return (
            <WorkoutContainer key={workoutIndex}>
              <WorkoutTitle>
                워크아웃 {workoutIndex + 1}. {workout.title}
              </WorkoutTitle>

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

        {/* <WorkoutContainer>
          {fields.map((item, templateIndex) => {
            return (
              <TemplateContainer key={item.id}>
                <TitleContainer>
                  <Controller
                    name={`templates[${templateIndex}].name`}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <WorkoutTitle
                        placeholder="워크아웃 이름"
                        placeholderTextColor="#797d7f"
                        onChangeText={(text) =>
                          setValue(`templates[${templateIndex}].name`, text)
                        }
                      />
                    )}
                  />
                  {/* <CloseTemplateButton
                text="닫기"
                onPress={() => remove(templateIndex)}
              /> */}
        {/* </TitleContainer> */}

        {/* <ExerciseContainer>
              <TemplateSetArray
                templateIndex={templateIndex}
                {...{ control, setValue }}
              />
            </ExerciseContainer> */}
        {/* </TemplateContainer>
            );
          })}
        </WorkoutContainer> */}

        {/* <>
          {program?.templates.map((template, index) => {
            return (
              <WorkoutContainer key={index}>
                <WorkoutTitle>{template.title}</WorkoutTitle>
                {template?.map((templateSets, templateSetIndex) => {
                return (
                  <ExerciseContainer key={templateSetIndex}>
                    <ExerciseTitle>{templateSets.exercise}</ExerciseTitle>)
                  </ExerciseContainer>
                );
              })}
                <StartButton
                  text="워크아웃 시작"
                  onPress={() => {
                    navigation.navigate("CreateWorkout");
                  }}
                />
              </WorkoutContainer>
            );
          })}
        </> */}

        {/* <TemplateArray
          {...{
            control,
            getValues,
            setValue,
          }}
        />
         */}

        {/* <>
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
        </> */}
      </Container>
    </DismissKeyboard>
  );
}
