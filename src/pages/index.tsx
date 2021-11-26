import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, SimpleGrid, Stack } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";
import React from "react";

import { useMovieContext } from "components/provider";
import AppLoader from "components/ui/AppLoader";
import { LinkComponent } from "components/ui/LinkComponent";
import MovieBox from "components/ui/MovieBox";
import SearchBar from "components/ui/SearchBar";
import Main from "components/wrapper/Main";

const Index = () => {
  const {
    movieList,
    searchKeyword,
    loadMovies,
    page,
    isSubmitted,
    setNextPage,
    setPrevPage,
  } = useMovieContext();

  const nextPage = async () => {
    await getMovieListPagination(page + 1);
    setNextPage();
  };

  const prevPage = async () => {
    await getMovieListPagination(page - 1);
    setPrevPage();
  };

  const getMovieListPagination = async (pageNum: number) => {
    return await loadMovies(searchKeyword, pageNum);
  };

  return (
    <Main>
      <SearchBar />
      {movieList.Response === "" && isSubmitted && <AppLoader />}
      {movieList.Response === "True" && movieList.Search && (
        <Stack spacing={3}>
          <SimpleGrid columns={[1, 2]} spacing={3}>
            {movieList.Search?.map((movie, index) => (
              <LinkComponent key={index} href={`/${movie.imdbID}`}>
                <MovieBox movie={movie} />
              </LinkComponent>
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
        </Stack>
      )}

      {movieList.Response === "False" && movieList.Error && (
        <Text textAlign="center">Oops not found!</Text>
      )}
    </Main>
  );
};

export default Index;
