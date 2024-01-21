"use client";
import React from "react";
import { ConnectKitButton } from "connectkit";
import { Image, Spacer, Flex, Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      color="white"
    >
      <Flex align="center" mr={5}>
        <Image
          src="/Gho_new.svg"
          alt="Logo"
          width="150px"
          height="100px"
          ml={10}
        />
      </Flex>
      <Spacer />
      <Box mr={4}>
        <ConnectKitButton />
      </Box>
    </Flex>
  );
};

export default Navbar;
