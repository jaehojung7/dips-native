import React from "react";
import styled from "styled-components/native";

const ErrorText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

export default function FormError({ message }) {
  return message === "" || !message ? null : <ErrorText>{message}</ErrorText>;
}
