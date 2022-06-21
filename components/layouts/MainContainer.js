import React from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

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

// const TitleContainer = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 5px;
// `;

// const ContainerTitle = styled.TextInput`
//   font-size: 20px;
//   font-weight: 600;
//   color: ${(props) => props.theme.fontColor};
// `;
