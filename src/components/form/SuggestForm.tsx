import React, { useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";

export interface Suggestion {
  id: number;
  text: string;
}

interface SuggestFormProps {
  text: string;
  setText: (value: string) => void;
}

// TODO : suggestの型はgooglemapからの結果次第で変更する
// TODO : handleOnChange内でsuggest結果をセットしている
export const SuggestForm = ({ text, setText }: SuggestFormProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const tests: Suggestion[] = [
    { id: 1, text: "React" },
    { id: 2, text: "Ruby on Rails" },
    { id: 3, text: "JavaScript" },
    { id: 4, text: "TypeScript" },
    { id: 5, text: "Go" },
    { id: 6, text: "HTML" },
    { id: 7, text: "CSS" },
  ];

  const handleOnChange = (value: string) => {
    setText(value);
    if (value === "") {
      setSuggestions([]);
      return;
    }

		// TODO : ここでvalueを使ってAPIを叩いて候補セットする
    const newSuggestions = tests.filter((suggestion) =>
      suggestion.text.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(newSuggestions);
  };

  return (
    <Box>
      <Input
        onFocus={() => setIsFocus(true)}
        type="text"
        value={text}
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
        borderColor="gray.200"
      />
      {isFocus && (
        <Box
          w="100%"
          h="100%"
          boxShadow="md"
          bg="white"
          mt="8px"
          borderRadius="lg"
        >
          {suggestions?.map((suggestion, i) => (
            <Text
              cursor="pointer"
              bg="white"
              _hover={{ bg: "gray.100" }}
              key={i}
              p="8px 8px"
              onClick={async () => {
                await setText(suggestion.text);
                await setIsFocus(false);
              }}
            >
              {suggestion.text}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
