import { React, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import MainButton from "../components/Buttons/MainButton";
import { Controller, useForm } from "react-hook-form";

const CREATE_EXERCISE_MUTATION = gql`
  mutation createExercise($exercise: String!, $bodyPart: String!) {
    createExercise(exercise: $exercise, bodyPart: $bodyPart) {
      ok
      error
    }
  }
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  margin: 10px 0 15px 0;
  opacity: 0.5;
`;

const Container = styled.ScrollView`
  background-color: white;
  padding: 0 20px;
`;

const HeaderContainer = styled.View`
  margin: 25px 0;
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const ExerciseTitle = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 15px;
  font-size: 20px;
  border-radius: 20px;
`;

const BodyPartContainer = styled.View`
  /* flex-direction: row; */
  /* align-items: center; */
  justify-content: space-around;
  border-radius: 20px;
  margin: 25px 0;
`;

const BodyPartTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  /* text-align: center; */
`;

const PickerContainer = styled.View`
  border-radius: 25px;
  /* width: 60%; */
  /* border: 1px solid black; */
`;

const Button = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 17px;
  font-weight: 600;
  text-align: center;
`;

export default function CreateExercise({ navigation }) {
  const { register, handleSubmit, setValue, getValues, control } = useForm();

  const onCompleted = (data) => {
    // 내 운동 목록으로 돌아가기
    // 새 종목 캐시에 추가하여 보여주기
  };

  const [createExerciseFunction, { loading }] = useMutation(
    CREATE_EXERCISE_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid = (submissionData) => {
    if (loading) {
      return;
    }
    const { exercise, bodyPart } = getValues();
    createExerciseFunction({
      variables: { exercise, bodyPart },
    });
  };

  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Header>운동 추가</Header>
          <Button onPress={() => navigation.goBack()}>
            <ButtonText>닫기</ButtonText>
          </Button>
        </HeaderContainer>

        <Controller
          name="exercise"
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <ExerciseTitle
              placeholder="운동 이름"
              autoCapitalize="none"
              returnKeyType="done"
              returnKeyLabel="done"
              placeholderTextColor="#7b7b7b"
              onChangeText={(text) => setValue("exercise", text)}
            />
          )}
        />

        <BodyPartContainer>
          <BodyPartTitle>운동 부위</BodyPartTitle>
          <BorderLine />
          <PickerContainer>
            <Controller
              name="bodyPart"
              control={control}
              rules={{ required: true }}
              defaultValue="Back"
              render={({ value }) => (
                <Picker
                  itemStyle={{
                    height: 150,
                    color: "black",
                    fontSize: 19,
                  }}
                  selectedValue={value}
                  onValueChange={(itemValue) => setValue("bodyPart", itemValue)}
                >
                  <Picker.Item label="등 - Back" value="Back" />
                  <Picker.Item label="가슴 - Chest" value="Chest" />
                  <Picker.Item label="하체 - Leg" value="Leg" />
                  <Picker.Item label="어깨 - Shoulder" value="Shoulder" />
                  <Picker.Item label="코어 - Core" value="Core" />
                  <Picker.Item label="팔 - Arm" value="Arm" />
                </Picker>
              )}
            />
          </PickerContainer>
          <BorderLine />
        </BodyPartContainer>

        <MainButton
          text="운동 만들기"
          disabled={false}
          loading={loading}
          onPress={handleSubmit(onSubmitValid)}
        />
      </Container>
    </DismissKeyboard>
  );
}
