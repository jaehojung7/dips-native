import { withTheme } from "styled-components";
import styled from "styled-components/native";

export const darkTheme = {
  fontColor: "white",
};

export const lightTheme = {
  fontColor: "black",
};

const ColorText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

export default ColorText;
