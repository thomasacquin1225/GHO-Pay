import React from "react";
import {
  ChakraProvider,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Select,
  Tabs,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

const TabbedForms = () => {
  return (
    <Flex direction="column" height="100vh">
      {/* <Flex justify="flex-end" p={4}>
        <Button colorScheme="gray" variant="outline">
          Connect Wallet
        </Button>
      </Flex> */}
      <Flex flex={1} alignItems="center" justifyContent="center" p={4}>
        <Box
          p={4}
          boxShadow="md"
          bg="white"
          borderRadius="lg"
          minW={{ base: "90%", sm: "lg" }}
          w="full"
          maxW="xl"
        >
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Swap</Tab>
              <Tab>Top Up</Tab>
            </TabList>
            <TabPanels height="sm">
              <TabPanel>
                <FormControl>
                  <FormLabel>From Chain</FormLabel>
                  <Select placeholder="Select Chain">
                    <option>Bitcoin</option>
                    <option>Ethereum</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Address</FormLabel>
                  <Input placeholder="Enter address" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>To Chain</FormLabel>
                  <Select placeholder="Select Chain">
                    <option>Bitcoin</option>
                    <option>Ethereum</option>
                  </Select>
                </FormControl>
                <Button width="full" mt={4} bg="black" color="white">
                  Swap
                </Button>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input placeholder="Enter amount" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Currency</FormLabel>
                  <Input placeholder="Select cryptocurrency" />
                </FormControl>
                <Button width="full" mt={4} bg="black" color="white">
                  Top Up
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TabbedForms;
