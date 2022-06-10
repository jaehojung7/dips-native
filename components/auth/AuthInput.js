import styled from "styled-components/native";

export const AuthInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  padding: 13px 15px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 7px;
  margin-bottom: 8px;
  border: 1.5px solid
    ${(props) => (props.hasError ? props.theme.mainColor : props.theme.gray)};
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;
