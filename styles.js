import styled from "styled-components/native";

export const darkTheme = {
  fontColor: "white",
  accent: "#ee6600",
  buttonText: "white",
};

export const lightTheme = {
  fontColor: "black",
  accent: "#ee6600",
  buttonText: "white",
};

const ColorText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

export const colors = {
  neutral: "gray",
  point: "#ee6600",
};

export default ColorText;
