import styled from "styled-components/native";

export const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;

export const TitleContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 15px;
  padding: 15px 25px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
`;

export const TitleInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  font-size: 21px;
  font-weight: 600;
`;

export const SuccessMessage = styled.Text`
  color: #40b981;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 12px;
  text-align: center;
`;
