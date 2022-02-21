import React from "react";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.ScrollView`
  margin: 20px 10px;
`;

const HeaderContainer = styled.View`
  margin: 30px 15px 15px 15px;
`;

const Header = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: 25px;
  font-weight: 700;
`;

const Button = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export default function Profile() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <DismissKeyboard>
      <Container showsVerticalScrollIndicator={false}>
        <HeaderContainer>
          <Header>프로필</Header>
        </HeaderContainer>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </Container>
    </DismissKeyboard>
  );
}
