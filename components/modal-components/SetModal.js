import styled from "styled-components/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import CloseButton from "./CloseButton";

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PopupView = styled.View`
  border-radius: 25px;
  background-color: white;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.gray};
`;

const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

const SetContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 5px;
  border-radius: 5px;
  width: 30px;
`;

const Mainset = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const Warmup = styled.Text`
  color: ${(props) => props.theme.orange};
  font-weight: 700;
  font-size: 15px;
  text-align: center;
`;

const SetOption = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
  color: black;
`;

export default function SetModal({ setModalVisible, setIsWarmup }) {
  return (
    <CenterView>
      <PopupView>
        <IconContainer
          onPress={() => {
            setIsWarmup(true);
          }}
        >
          <SetContainer>
            <Warmup>W</Warmup>
          </SetContainer>
          <SetOption>웜업세트 Warm-up</SetOption>
        </IconContainer>

        <IconContainer
          onPress={() => {
            setIsWarmup(false);
          }}
        >
          <SetContainer>
            <Mainset>M</Mainset>
          </SetContainer>
          <SetOption>메인세트 Main Set</SetOption>
        </IconContainer>

        <IconContainer
          onPress={() => {
            setIsDropset(true);
            setIsWarmup(false);
          }}
        ></IconContainer>

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
