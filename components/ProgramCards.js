import { FlatList, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const ProgramContainer = styled.View`
  margin: 15px 15px 0 0;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 20px;
  padding: 15px 20px;
  width: 200px;
`;

const ProgramTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.fontColor};
`;

const WorkoutTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  opacity: 0.6;
`;

export default function ProgramCards({ programs, exercises }) {
  const navigation = useNavigation();
  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SeeProgram", {
            program,
            exercises,
            directStart: true,
          })
        }
      >
        <ProgramContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <WorkoutTitle>{program.workouts.length} workouts</WorkoutTitle>
        </ProgramContainer>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={programs}
      keyExtractor={(item, index) => "" + index}
      renderItem={renderProgram}
      horizontal
      initialNumToRender={3}
      windowSize={3}
      maxToRenderPerBatch={2}
      showsHorizontalScrollIndicator={false}
    />
  );
}
