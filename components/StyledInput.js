import styled from "styled-components/native";

export const AuthInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  padding: 15px 10px;
  font-size: 15px
  border-radius: 5px;
  margin-bottom: ${(props) => (props.lastOne ? "17" : 13)}px;
  border: 1px solid ${(props) => props.theme.blue};
`;

export const TitleInput = styled.TextInput`
    color: ${(props) => props.theme.fontColor};
  /* background-color: #e5e7e9; */
  padding: 7px 10px;
  font-size: 17px
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const TemplateInput = styled.TextInput`
  color: ${(props) => props.theme.fontColor};
  background-color: #e5e7e9;
  padding: 7px 10px;
  font-size: 15px
  border-radius: 5px;
  margin-bottom: ${(props) => (props.lastOne ? "17" : 13)}px;
  /* border: 1px solid ${(props) => props.theme.gray}; */
`;
