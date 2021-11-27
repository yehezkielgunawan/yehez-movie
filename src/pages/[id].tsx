import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Skeleton,
  Stack,
  Text,
  Image,
  Heading,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";

import { INITIAL_DETAIL_MOVIE, useMovieContext } from "components/provider";
import { SingleMovieDetail } from "components/provider/types";
import { LinkComponent } from "components/ui/LinkComponent";
import Main from "components/wrapper/Main";
import { getMovieDetailsRes } from "functions/services/fetcher";

const MovieDetails = () => {
  const { handleFavourite, checkFavourite } = useMovieContext();
  const router = useRouter();
  const { id } = router.query;
  const [tempDetail, setTempDetail] =
    useState<SingleMovieDetail>(INITIAL_DETAIL_MOVIE);

  const getMovieDetails = async () => {
    return await getMovieDetailsRes(String(id)).then((res: SingleMovieDetail) =>
      setTempDetail(res)
    );
  };

  const setFavourite = () => {
    handleFavourite("set", tempDetail);
  };

  const deleteFavourite = () => {
    handleFavourite("delete", tempDetail);
  };

  useEffect(() => {
    getMovieDetails();
    checkFavourite(String(id));
  });

  return (
    <Main>
      <Skeleton isLoaded={tempDetail.Response === "True" ? true : false}>
        <Stack spacing={3}>
          <Flex align="center" justify="center">
            <Image
              alt="movie poster"
              src={tempDetail?.Poster}
              align="center"
              w={["240px", "320px"]}
              objectFit="contain"
              fallbackSrc="https://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg/revision/latest?cb=20110517171552"
            />
          </Flex>
          <Divider />
          <Heading as="h1">{tempDetail.Title}</Heading>
          <Text>
            <b>Date Released :</b> {tempDetail.Released}
          </Text>
          <Text>
            <b>Genre :</b> {tempDetail.Genre}{" "}
          </Text>
          <Text>
            <b>Producer :</b> {tempDetail.Production}
          </Text>
          <Text>
            <b>Director :</b> {tempDetail.Director}
          </Text>
          <Text>
            <b>Writer :</b> {tempDetail.Writer}
          </Text>
          <Text>
            <b>Actors :</b> {tempDetail.Actors}
          </Text>
          <Text>
            <b>Sinopsis :</b> {tempDetail.Plot}
          </Text>
        </Stack>
      </Skeleton>
      <Flex gridGap={2} w="100%">
        <LinkComponent href="/">
          <Button leftIcon={<ChevronLeftIcon />} colorScheme="gray">
            Go Back
          </Button>
        </LinkComponent>

        {checkFavourite(String(id)) ? (
          <Button
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            onClick={() => deleteFavourite()}
            disabled={!checkFavourite(String(id))}
          >
            Remove From Favourite
          </Button>
        ) : (
          <Button
            colorScheme="yellow"
            leftIcon={<MdFavorite />}
            onClick={() => setFavourite()}
            disabled={checkFavourite(String(id))}
          >
            Add to Favourite
          </Button>
        )}
      </Flex>
    </Main>
  );
};

export default MovieDetails;
