import styled from "styled-components/native";

const Container = styled.ScrollView`
  margin: 0 10px;
`;
const ProgramContainer = styled.View``;
const TitleContainer = styled.TouchableOpacity``;

const ProgramTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
  margin: 13px 5px;
  font-weight: 600;
`;

const ListContainer = styled.View`
  /* margin: 10px 0; */
`;

const BorderLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.gray};
  opacity: 0.5;
`;

export default function SearchProgram({ navigation, route }) {
  const { programs } = route.params;

  return (
    <Container>
      <ListContainer>
        {programs.map((program) => {
          return (
            <ProgramContainer key={program.id}>
              <TitleContainer
                onPress={() => {
                  navigation.navigate("SeeProgram", { program });
                }}
              >
                <ProgramTitle>{program.title}</ProgramTitle>
              </TitleContainer>
              <BorderLine />
            </ProgramContainer>
          );
        })}
      </ListContainer>
    </Container>
  );
}
