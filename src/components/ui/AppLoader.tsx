import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const AppLoader = () => {
  return (
    <Flex align="center" justify="center">
      <Spinner size="lg" />
    </Flex>
  );
};

export default AppLoader;
