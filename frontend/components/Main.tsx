"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
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
  const buttonStyle = {
    width: "full",
    mt: 4,
    bg: "black",
    color: "white",
  };

  const router = useRouter();
  return (
    <Flex direction="column" height="100vh">
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
              <Tab>Pay</Tab>
              <Tab>Top-up</Tab>
              <Tab>Withdraw</Tab>
            </TabList>
            <TabPanels height="sm">
              <TabPanel>
                <FormControl mt={4}>
                  <FormLabel>To</FormLabel>
                  <Input placeholder="Enter payee address" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input placeholder="Enter GHO amount" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Destination chain</FormLabel>
                  <Select placeholder="Select chain" defaultValue={"16015286601757825753"}>
                    <option value={"16015286601757825753"}>Sepolia</option>
                    <option value={"2664363617261496610"}>Optimism Goerli</option>
                    <option value={"12532609583862916517"}>Mumbai</option>
                    <option value={"14767482510784806043"}>Fuji</option>
                    <option value={"5790810961207155433"}>Base Goerli</option>
                    <option value={"3478487238524512106"}>Arbitrum Sepolia</option>
                  </Select>
                </FormControl>
                <Button {...buttonStyle}>Pay</Button>
                <Button
                  {...buttonStyle}
                  onClick={() => router.push("/transactions")}
                >
                  Transaction History
                </Button>
              </TabPanel>
              <TabPanel>
                <FormControl mt={4}>
                  <FormLabel>Choose collateral</FormLabel>
                  <Select placeholder="Select collateral asset" defaultValue={"ETH"}>
                    <option value={"ETH"}>ETH</option>
                    <option value={"WETH"}>WETH</option>
                    <option value={"WBTC"}>WBTC</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input placeholder="Enter amount" />
                </FormControl>
                <Button {...buttonStyle}>Top Up</Button>
              </TabPanel>
              <TabPanel>
                <FormControl mt={4}>
                  <FormLabel>Choose collateral</FormLabel>
                  <Select placeholder="Select collateral asset" defaultValue={"ETH"}>
                    <option value={"ETH"}>ETH</option>
                    <option value={"WETH"}>WETH</option>
                    <option value={"WBTC"}>WBTC</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input placeholder="Enter amount" />
                </FormControl>
                <Button {...buttonStyle}>Withdraw</Button>
                <Button
                  {...buttonStyle}
                  onClick={() => router.push("/transactions")}
                >
                  Transaction History
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
