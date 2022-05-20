import styled from "styled-components/native";

export const AuthInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  padding: 15px;
  font-size: 15px;
  border-radius: 20px;
  margin-bottom: ${(props) => (props.lastOne ? "17" : 13)}px;
  border: 1px solid ${(props) => props.theme.mainColor};
`;
