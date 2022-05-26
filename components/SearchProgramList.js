import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const ProgramContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 15px 10px;
`;

const ProgramTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.fontColor};
  width: 75%;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 20%;
`;

const IconText = styled.Text`
  color: ${(props) => props.theme.mainColor};
`;

export default function SearchProgramList({ programs }) {
  const navigation = useNavigation();
  const renderProgram = ({ item: program }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SeeProgram", { program, directStart: false })
        }
      >
        <ProgramContainer>
          <ProgramTitle>{program.title}</ProgramTitle>
          <IconContainer>
            {program.isMine ? (
              <>
                <IconText>
                  <FontAwesome5 name="user-alt" size={14} />
                </IconText>
                <IconText>
                  {program.isPublic ? (
                    <FontAwesome5 name="lock-open" size={14} />
                  ) : (
                    <FontAwesome5 name="lock" size={14} />
                  )}
                </IconText>
              </>
            ) : (
              <IconText>
                {program.isLiked ? (
                  <FontAwesome name="star" size={16} />
                ) : (
                  <FontAwesome name="star-o" size={16} />
                )}
              </IconText>
            )}
          </IconContainer>
        </ProgramContainer>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={programs}
      keyExtractor={(item, index) => "" + index}
      renderItem={renderProgram}
      initialNumToRender={3}
      windowSize={3}
      maxToRenderPerBatch={2}
      showsHorizontalScrollIndicator={false}
    />
  );
}
