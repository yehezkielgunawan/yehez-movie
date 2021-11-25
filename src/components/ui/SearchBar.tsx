import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Stack, Text } from "@chakra-ui/layout";
import React, { KeyboardEventHandler, useState } from "react";

import { useMovieContext } from "components/provider";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const { loadMovies } = useMovieContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchKey(e.target.value);
  };

  const handleSubmit = async () => {
    return await getMovieList(searchKey);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const getMovieList = async (keyword: string) => {
    await loadMovies(keyword);
  };

  return (
    <Stack spacing={2}>
      <Text>
        Want to know your favourite movie more? Here is the right place.
      </Text>
      <Input
        placeholder="Input the movie title or keyword"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
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
