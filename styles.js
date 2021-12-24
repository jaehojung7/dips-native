import styled from "styled-components/native";

export const darkTheme = {
  fontColor: "white",
  accent: "#FF7F50",
  buttonText: "white",
};

export const lightTheme = {
  fontColor: "black",
  accent: "#FF7F50",
  buttonText: "white",
};

const ColorText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

export const colors = {
  neutral: "gray",
  accent: "#FF7F50",
};

export default ColorText;
