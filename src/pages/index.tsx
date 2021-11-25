import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, SimpleGrid } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { useMovieContext } from "components/provider";
import MovieBox from "components/ui/MovieBox";
import SearchBar from "components/ui/SearchBar";
import Main from "components/wrapper/Main";

const Index = () => {
  const { movieList, searchKeyword, loadMovies } = useMovieContext();
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(
    movieList.Search?.length ?? 0
  );

  const nextPage = async () => {
    await getMovieListPagination(page + 1);
    setPage(page + 1);
    setItemPerPage(itemPerPage + (movieList.Search ?? []).length);
  };

  const prevPage = async () => {
    await getMovieListPagination(page - 1);
    setPage(page - 1);
    setItemPerPage(itemPerPage - (movieList.Search ?? []).length);
  };

  const getMovieListPagination = async (pageNum: number) => {
    return await loadMovies(searchKeyword, pageNum);
  };

  return (
    <Main>
      <SearchBar />
      {movieList.Response === "True" && searchKeyword.length > 0 && (
        <>
          <SimpleGrid columns={[1, 2]} spacing={3}>
            {movieList.Search?.map((movie, index) => (
              <MovieBox movie={movie} key={index} />
            ))}
          </SimpleGrid>
          <Flex gridGap={4} align="center" justify="center">
            <Button
              variant="ghost"
              leftIcon={<ChevronLeftIcon />}
              onClick={() => prevPage()}
              disabled={page === 1}
            >
              Previous Page
            </Button>
            <Text>
              Page{" "}
              <b>
                {" "}
                {page} of {Math.ceil((movieList.totalResults ?? 0) / 10)}{" "}
              </b>
            </Text>
            <Button
              variant="ghost"
              rightIcon={<ChevronRightIcon />}
              onClick={() => nextPage()}
              disabled={(movieList.Search ?? []).length < 10 ? true : false}
            >
              Next Page
            </Button>
          </Flex>
        </>
      )}

      {movieList.Response === "False" && searchKeyword.length > 0 && (
        <Text textAlign="center">Oops not found!</Text>
      )}
    </Main>
  );
};

export default Index;
