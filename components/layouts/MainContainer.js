import styled from "styled-components/native";

export const Container = styled.ScrollView`
  margin: 5px 10px 0 10px;
`;

export const MainContainer = styled.View`
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 15px;
  padding: 15px;
`;

export const HeaderContainer = styled.View`
  margin: 0 10px 5px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: 700;
`;

export const TitleContainer = styled.View`
  margin-bottom: 15px;
  padding: 10px 20px;
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
