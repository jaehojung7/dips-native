import styled from "styled-components/native";

export const darkTheme = {
  fontColor: "white",
  orange: "#FF7F50",
  blue: "#42a5f5",
  gray: "#e5e7e9",
  buttonText: "white",
};

export const lightTheme = {
  fontColor: "black",
  orange: "#FF7F50",
  blue: "#42a5f5",
  gray: "#e5e7e9",
  buttonText: "white",
};

const ColorText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

export default ColorText;
