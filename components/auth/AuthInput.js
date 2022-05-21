import styled from "styled-components/native";

export const AuthInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  padding: 15px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 10px;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 13)}px;
  border: 1px solid ${(props) => props.theme.mainColor};
`;
