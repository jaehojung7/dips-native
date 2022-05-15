import styled from "styled-components/native";
import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query me {
    me {
      id
      programs {
        id
        title
        workouts {
          title
          workoutIndex
          workoutSets {
            id
            exercise
            setCount
            repCount
          }
        }
      }
      exercises {
        id
        exercise
        bodyPart
      }
    }
  }
`;

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

export default function SearchProgram({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  // 프로그램이 많아서 loading 이 길어질 경우 loading 을 어떻게 사용할지 생각해 볼 것
  return (
    <Container>
      <ListContainer>
        {data?.me?.programs.map((program) => {
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
