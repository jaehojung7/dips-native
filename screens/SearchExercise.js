import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.ScrollView`
  margin: 20px 10px;
  /* align-items: center; */
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

export default function SearchExercise() {
  const navigation = useNavigation();
  return (
    <Container>
      <Button onPress={() => navigation.navigate("CreateExercise")}>
        <ButtonText>운동 찾기</ButtonText>
      </Button>
    </Container>
  );
}
