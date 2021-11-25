import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Skeleton, Image } from "@chakra-ui/react";
import React from "react";

import { SingleMovie } from "components/provider/types";

type MovieBoxProps = {
  movie: SingleMovie;
};

const MovieBox = ({ movie }: MovieBoxProps) => {
  return (
    <Box
      _hover={{
        bg: "gray.500",
      }}
      p={4}
      overflow="hidden"
      borderRadius={10}
      borderWidth={2}
      w="100%"
    >
      <Skeleton isLoaded={movie ? true : false}>
        <Flex gridGap={3} align="center" justify="start">
          <Image
            src={movie.Poster}
            w={["140px", "100px"]}
            align="center"
            objectFit="contain"
            alt="Movie Poster"
            fallbackSrc="https://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg/revision/latest?cb=20110517171552"
          />

          <Stack spacing={2} justify="left" as="a">
            <Text fontSize={["md", "sm"]}>
              <b>Title:</b> {movie.Title}
            </Text>
            <Text fontSize={["md", "sm"]}>
              <b> Year Published:</b> {movie.Year}
            </Text>
            <Text fontSize={["md", "sm"]}>
              <b>IMDB ID: </b> {movie.imdbID}
            </Text>
            <Text fontSize={["md", "sm"]}>
              <b>Type:</b> {movie.Type}
            </Text>
          </Stack>
        </Flex>
      </Skeleton>
    </Box>
  );
};

export default MovieBox;
