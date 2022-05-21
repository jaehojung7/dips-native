import styled from "styled-components/native";

export const AuthInput = styled.TextInput`
  color: black;
  padding: 13px 15px;
  font-size: 17px;
  border-radius: 20px;
  margin-bottom: ${(props) => (props.lastOne ? "17" : 13)}px;
  background-color: ${(props) => props.theme.inputBackground};
`;
