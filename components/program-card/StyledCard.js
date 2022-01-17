import styled from "styled-components/native";

export const ProgramContainer = styled.View`
  margin: 5px 5px 20px 5px;
  border: 1px solid #cacfd2;
  border-radius: 5px;
  padding: 10px;
  width: 200px;
  height: 90px;
  /* justify-content: center; */
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProgramTitle = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.fontColor};
`;

export const TitleIcon = styled.Text`
  margin: 0 3px 0 7px;
  color: ${(props) => props.theme.blue};
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 7px;
  color: ${(props) => props.theme.darkgray};
`;
