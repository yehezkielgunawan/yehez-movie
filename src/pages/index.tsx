import { SimpleGrid } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";

import { useMovieContext } from "components/provider";
import MovieBox from "components/ui/MovieBox";
import SearchBar from "components/ui/SearchBar";
import Main from "components/wrapper/Main";

const Index = () => {
  const { movieList } = useMovieContext();

  return (
    <Main>
      <SearchBar />
      {movieList.Response === "True" && (movieList.Search ?? []) && (
        <SimpleGrid columns={[1, 2]} spacing={3}>
          {movieList.Search?.map((movie, index) => (
            <MovieBox movie={movie} key={index} />
          ))}
        </SimpleGrid>
      )}

      {movieList.Response === "False" && (
        <Text textAlign="center">Oops not found!</Text>
      )}
    </Main>
  );
};

export default Index;
