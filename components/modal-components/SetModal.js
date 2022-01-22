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
  margin-bottom: 18px;
`;

const Warmup = styled.Text`
  /* font-size: 16px;
  font-weight: 700;
  margin-left: 5px; */
  color: ${(props) => props.theme.orange};
`;

const Dropset = styled.Text`
  /* font-size: 16px;
  font-weight: 700;
  margin-left: 5px; */
  color: ${(props) => props.theme.blue};
`;

const SetOption = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-left: 5px;
  color: black;
`;

export default function SetModal({
  setModalVisible,
  setIsWarmup,
  setIsDropset,
}) {
  return (
    <CenterView>
      <PopupView>
        <IconContainer
          onPress={() => {
            setIsWarmup(true);
            setModalVisible(false);
          }}
        >
          <Warmup>
            <FontAwesome5 name="arrow-circle-up" size={20} />
          </Warmup>
          <SetOption>웜업세트 Warm-up</SetOption>
        </IconContainer>

        <IconContainer
          onPress={() => {
            setIsDropset(true);
            setModalVisible(false);
          }}
        >
          <Dropset>
            <FontAwesome5 name="arrow-circle-down" size={20} />
          </Dropset>
          <SetOption>드롭세트 Drop Set</SetOption>
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
