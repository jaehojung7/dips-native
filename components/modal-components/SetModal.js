import styled from "styled-components/native";
import CloseButton from "./CloseButton";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PopupView = styled.View`
  border-radius: 25px;
  background-color: white;
  padding: 18px;
`;

const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const SetType = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-left: 5px;
  color: ${(props) => props.theme.orange};
`;

const SetIcon = styled.Text`
  color: ${(props) => props.theme.orange};
`;

export default function SetModal({ setModalVisible }) {
  return (
    <CenterView>
      <PopupView>
        <IconContainer>
          <SetIcon>
            <FontAwesome5 name="arrow-circle-up" size={18} />
          </SetIcon>
          <SetType>Warm-up</SetType>
        </IconContainer>

        <IconContainer>
          <SetIcon>
            <FontAwesome5 name="arrow-circle-down" size={18} />
          </SetIcon>
          <SetType>Drop Set</SetType>
        </IconContainer>

        <CloseButton
          text="닫기"
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </PopupView>
    </CenterView>
  );
}
