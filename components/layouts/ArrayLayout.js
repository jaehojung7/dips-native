import styled from "styled-components/native";

export const SelectExercise = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  border: 1.5px solid
    ${(props) =>
      props.hasError ? props.theme.mainColor : props.theme.inputBackground};
`;

export const ExerciseTitle = styled.Text`
  color: black;
  font-size: 15px;
  text-align: center;
`;

export const ArrayContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const IndexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const IndexText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  padding: 0 5px;
`;

export const InputCount = styled.TextInput`
  color: black;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px 5px;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  border: 1.5px solid
    ${(props) =>
      props.hasError ? props.theme.mainColor : props.theme.inputBackground};
  width: 35%;
`;
