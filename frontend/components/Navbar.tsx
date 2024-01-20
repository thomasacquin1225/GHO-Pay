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
      bg="gray.100"
      padding={4}
      color="white"
    >
      <Flex align="center" mr={5}>
        <Image src="/logo.svg" alt="Logo" boxSize="50px" />
        <Box
          p={3}
          borderRadius="md"
          bg="black"
          color="white"
          fontSize="xl"
          fontWeight="normal"
          fontFamily="Arial, sans-serif"
        >
          <strong>GHO</strong> Pay
        </Box>
      </Flex>
      <Spacer />
      <ConnectKitButton />
    </Flex>
  );
};

export default Navbar;
