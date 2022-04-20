import styled from "styled-components/native";

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

const CloseButton = styled.TouchableOpacity`
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export default function SetModal({ setModalVisible }) {
  const [keyword, setKeyword] = useState("");

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

        <CloseButton
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <ButtonText>닫기</ButtonText>
        </CloseButton>
      </PopupView>
    </CenterView>
  );
}
