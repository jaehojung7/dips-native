import styled from "styled-components/native";

export const darkTheme = {
  fontColor: "white",
  accent: "#ee6600",
  buttonText: "black",
};

export const lightTheme = {
  fontColor: "black",
  accent: "#176193",
  buttonText: "white",
};

const ColorText = styled.Text`
  color: ${(props) => props.theme.accent};
`;

export default ColorText;
