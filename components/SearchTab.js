import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.gray};
  border-radius: 15px;
  padding: 10px 15px;
  margin: 0px 20px;
  /* display: flex; */
`;

const SearchInput = styled.TextInput`
  margin-left: 10px;
  padding: 0px;
`;

const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

export default function SearchTab() {
  const [keyword, setKeyword] = useState("");

  return (
    <SearchBarWrapper>
      <SearchInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setKeyword}
        placeholder="검색어를 입력해 주세요."
        returnKeyType="search"
        returnKeyLabel="search"
        value={keyword}
      />
      <FontAwesome name="search" size={15} color="#999999" />
    </SearchBarWrapper>
  );
}
