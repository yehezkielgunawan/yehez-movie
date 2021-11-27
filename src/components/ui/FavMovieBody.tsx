import { Image } from "@chakra-ui/image";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";

import { SingleMovieDetail } from "components/provider/types";

type FavMovieBoxProps = {
  favMovie: SingleMovieDetail;
};

const FavMovieBody = ({ favMovie }: FavMovieBoxProps) => {
  return (
    <Skeleton isLoaded={favMovie ? true : false}>
      <Flex gridGap={3} align="center" justify="start">
        <Image
          src={favMovie.Poster}
          w={["140px", "100px"]}
          align="center"
          objectFit="contain"
          alt="Movie Poster"
          fallbackSrc="https://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg/revision/latest?cb=20110517171552"
        />

        <Stack spacing={2} justify="left" as="a">
          <Text fontSize={["md", "sm"]}>
            <b>Title:</b> {favMovie.Title}
          </Text>
          <Text fontSize={["md", "sm"]}>
            <b> Year Published:</b> {favMovie.Year}
          </Text>
          <Text fontSize={["md", "sm"]}>
            <b>IMDB ID: </b> {favMovie.imdbID}
          </Text>
          <Text fontSize={["md", "sm"]}>
            <b>Type:</b> {favMovie.Type}
          </Text>
        </Stack>
      </Flex>
    </Skeleton>
  );
};

export default FavMovieBody;
