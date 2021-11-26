import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Stack, Text } from "@chakra-ui/layout";
import React, { KeyboardEventHandler } from "react";

import { useMovieContext } from "components/provider";

const SearchBar = () => {
  const { loadMovies, searchKeyword, handleChangeSearchKey, handleResetList } =
    useMovieContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleChangeSearchKey(e);
  };

  const handleSubmit = async () => {
    resetResult(false);
    return await getMovieList(searchKeyword);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const getMovieList = async (keyword: string) => {
    return await loadMovies(keyword);
  };

  const resetResult = (isResetButton: boolean) => {
    handleResetList(isResetButton);
  };

  return (
    <Stack spacing={2}>
      <Text>
        Want to know your favourite movie more? Here is the right place.
      </Text>
      <InputGroup size="md">
        <Input
          placeholder="Input the movie title or keyword"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={searchKeyword}
        />

        <InputRightElement w="4rem">
          <Button variant="outline" onClick={() => resetResult(true)}>
            Reset
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => handleSubmit()}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
