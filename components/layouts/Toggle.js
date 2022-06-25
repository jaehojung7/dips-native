import styled from "styled-components/native";

export const ToggleContainer = styled.View`
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ToggleText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-weight: 500;
  font-size: 15px;
  margin-right: 10px;
  margin-left: 5px;
`;

export const ToggleInfoText = styled.Text`
  color: ${(props) => props.theme.mainColor};
`;
