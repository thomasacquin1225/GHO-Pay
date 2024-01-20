"use client";
import React, { useState, useEffect, use } from "react";
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
  useToast,
  InputGroup,
  InputRightAddon,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Heading
} from "@chakra-ui/react";
import { 
  useAccount,
  useContractReads,
  useContractWrite 
} from 'wagmi';
import { deployedContracts } from "@/contracts/deployedContracts";


const TabbedForms = () => {
  const buttonStyle = {
    width: "full",
    mt: 4,
    bg: "black",
    color: "white",
  };

  const router = useRouter();
  const toast = useToast();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [payee, setPayee] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [destinationChain, setDestinationChain] = useState<string>("16015286601757825753");
  const [collateral, setCollateral] = useState<string>("ETH");

  const account = useAccount();
  const result1 = useContractReads({
    contracts: [
      {
        ...deployedContracts[11155111].GHOPay,
        functionName: 'getUserAccountData',
        args: [account.address as any]
      },
      {
        ...deployedContracts[11155111].GHOPay,
        functionName: 'getGHOBalance',
        args: [account.address as any]
      },
      {
        ...deployedContracts[11155111].GHOPay,
        functionName: 'getDepositedETH',
        args: [account.address as any]
      },
    ],
  });

  const handlePay = async () => {
    setLoading(true);
    console.log(result1);
    toast({
      title: "Transaction sent",
      description: "Transaction sent to the bridge",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setLoading(false);
  };

  useEffect(() => {
  }, [account]);   
  
  return (
    <Flex direction="column" height="100vh">
      <Flex flex={1} alignItems="center" justifyContent="center" p={4}>
        <Box
          p={4}
          boxShadow="md"
          bg="white"
          borderRadius="xl"
          minW={{ base: "90%", sm: "lg" }}
          w="full"
          maxW="xl"
        >
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Pay</Tab>
              <Tab>Wallet</Tab>
              <Tab>Borrowings</Tab>
            </TabList>
            <TabPanels height="sm">
              <TabPanel>
                <FormControl>
                  <FormLabel>To</FormLabel>
                  <Input placeholder="Enter payee address" onChange={(e) => setPayee(e.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <InputGroup>
                    <Input placeholder='Enter GHO amount' onChange={(e) => setAmount(parseFloat(e.target.value))} />
                    <InputRightAddon>
                      GHO
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} mb={4}>
                  <FormLabel>Destination chain</FormLabel>
                  <Select placeholder="Select chain" onChange={(e) => setDestinationChain(e.target.value)}>
                    <option value={"16015286601757825753"}>Sepolia</option>
                    <option value={"2664363617261496610"}>Optimism Goerli</option>
                    <option value={"12532609583862916517"}>Mumbai</option>
                    <option value={"14767482510784806043"}>Fuji</option>
                    <option value={"5790810961207155433"}>Base Goerli</option>
                    <option value={"3478487238524512106"}>Arbitrum Sepolia</option>
                  </Select>
                </FormControl>
                <Button isLoading={isLoading} {...buttonStyle} onClick={handlePay}>Pay</Button>
              </TabPanel>
              <TabPanel>
                {(result1.data as any)[0].status == "success" ?
                  <>
                    <StatGroup>
                      <Stat>
                        <StatLabel>Available</StatLabel>
                        <StatNumber>
                          {Number((result1.data as any)[0].result[2]) / 10 ** 8} GHO
                        </StatNumber>
                        <StatHelpText>
                          2.02%
                        </StatHelpText>
                      </Stat>
                    </StatGroup>

                    <StatGroup>
                      <Stat>
                        <StatLabel>Collateral</StatLabel>
                        <StatNumber>
                          ${(Number((result1.data as any)[0].result[0]) / 10 ** 8).toFixed(2)}
                        </StatNumber>
                        <StatHelpText>
                          0%
                        </StatHelpText>
                      </Stat>

                      <Stat>
                        <StatLabel>Debt</StatLabel>
                        <StatNumber>
                          {Number((result1.data as any)[0].result[1]) / 10 ** 8} GHO
                        </StatNumber>
                        <StatHelpText>
                          2.02%
                        </StatHelpText>
                      </Stat>
                    </StatGroup>
                  </>
                  :
                  <Box>
                    <p>Not connected</p>
                  </Box>
                }
                <FormControl mt={8}>
                  <FormLabel>Repay Debt</FormLabel>
                  <InputGroup>
                    <Input placeholder='Enter GHO amount' onChange={(e) => setAmount(parseFloat(e.target.value))} />
                    <InputRightAddon>
                      GHO
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
                <Button {...buttonStyle}>Repay</Button>
              </TabPanel>
              <TabPanel>
                {(result1.data as any)[2].status == "success" ?
                  <Heading as='h4' size='md'>
                    Collateral: {Number((result1.data as any)[2].result) / 10 ** 8} ETH
                  </Heading>
                  :
                  <Box>
                    <p>Not connected</p>
                  </Box>
                }
                <FormLabel mt={4}>Add collateral</FormLabel>
                <FormControl mt={4}>
                  <SimpleGrid columns={2} spacing={5}>
                    <Input placeholder="Enter amount" onChange={(e) => setAmount(parseFloat(e.target.value))} />
                    <Select placeholder="Select collateral asset" defaultValue={"ETH"}>
                      <option value={"ETH"}>ETH</option>
                      <option value={"WETH"}>WETH</option>
                      <option value={"WBTC"}>WBTC</option>
                    </Select>
                  </SimpleGrid>
                </FormControl>
                <Button {...buttonStyle}>Top-up</Button>
                <FormLabel mt={8}>Withdraw collateral</FormLabel>
                <FormControl mt={4}>
                  <SimpleGrid columns={2} spacing={5}>
                    <Input placeholder="Enter amount" onChange={(e) => setAmount(parseFloat(e.target.value))} />
                    <Select placeholder="Select collateral asset" defaultValue={"ETH"}>
                      <option value={"ETH"}>ETH</option>
                      <option value={"WETH"}>WETH</option>
                      <option value={"WBTC"}>WBTC</option>
                    </Select>
                  </SimpleGrid>
                </FormControl>
                <Button {...buttonStyle}>Withdraw</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      {account.isConnected &&
          <Button
            {...buttonStyle}
            onClick={() => router.push("/transactions")}
          >
            Transaction History
          </Button>
      }
    </Flex>
  );
};

export default TabbedForms;
