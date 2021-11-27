import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/react";
import React from "react";

import { useMovieContext } from "components/provider";
import { SingleMovieDetail } from "components/provider/types";
import FavMovieBody from "components/ui/FavMovieBody";
import { LinkComponent } from "components/ui/LinkComponent";
import Main from "components/wrapper/Main";

const Favourite = () => {
  const { favouriteList, handleFavourite, checkFavourite } = useMovieContext();

  const removeFromFavourite = (favouriteMovie: SingleMovieDetail) => {
    handleFavourite("delete", favouriteMovie);
    favouriteMovie.imdbID && checkFavourite(favouriteMovie.imdbID);
  };

  return (
    <Main>
      <LinkComponent href="/">
        <Button w="100%" leftIcon={<ChevronLeftIcon />} colorScheme="gray">
          Go Back
        </Button>
      </LinkComponent>

      {favouriteList.length < 1 ? (
        <Text>Oops, there is no favourite movies here.</Text>
      ) : (
        <Text fontSize="lg">Here are your favourite movie list!</Text>
      )}
      <SimpleGrid columns={[1, 2]} spacing={3}>
        {favouriteList.map((favMovie, index) => (
          <Box
            display="flex"
            key={index}
            _hover={{
              bg: "gray.500",
            }}
            p={4}
            overflow="hidden"
            borderRadius={10}
            borderWidth={2}
            w="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <LinkComponent href={`/${favMovie.imdbID}`}>
              <FavMovieBody favMovie={favMovie} />
            </LinkComponent>
            <IconButton
              aria-label="delete from favourite"
              icon={<CloseIcon />}
              onClick={() => removeFromFavourite(favMovie)}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Main>
  );
};

export default Favourite;
