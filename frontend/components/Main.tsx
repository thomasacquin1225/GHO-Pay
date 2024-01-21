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
  Heading,
  Image
} from "@chakra-ui/react";
import { 
  useAccount,
  useContractReads,
  useContractWrite 
} from 'wagmi';
import { createClient } from '@supabase/supabase-js';
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
  const supabase = createClient(
    'https://vidwrnyawsvghekqwfjj.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZHdybnlhd3N2Z2hla3F3ZmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3ODM5MjAsImV4cCI6MjAyMTM1OTkyMH0.0v5_eHojJILV65lYsg2VCpVkzgeNUJ4sXkeTBXHykyY'
  );

  const [mounted, setMounted] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [payee, setPayee] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.00");
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

  const pay = useContractWrite({
      ...deployedContracts[11155111].GHOPay,
      functionName: 'pay',
      args: [payee as any, BigInt(parseFloat(amount) * 10 ** 18), BigInt(destinationChain)]
  });

  const repay = useContractWrite({
    ...deployedContracts[11155111].GHOPay,
    functionName: 'repay',
    args: [BigInt(parseFloat(amount) * 10 ** 18)]
  });

  const topup = useContractWrite({
    ...deployedContracts[11155111].GHOPay,
    functionName: 'topup',
    value: BigInt(parseFloat(amount) * 10 ** 18),
    args: ["0x0000000000000000000000000000000000000000" as any, BigInt(parseFloat(amount) * 10 ** 18)]
  });

  const withdraw = useContractWrite({
    ...deployedContracts[11155111].GHOPay,
    functionName: 'withdraw',
    args: [
      "0x0000000000000000000000000000000000000000" as any, 
      "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830" as any, 
      BigInt(parseFloat(amount) * 10 ** 18)
    ]
  });

  const handlePay = async () => {
    setLoading(true);
    try {
      const tx = await pay.writeAsync();

      const created_at = new Date().toISOString();
      let destination = "Ethereum Sepolia";
      if (destinationChain == "2664363617261496610") {
        destination = "Optimism Goerli";
      } else if (destinationChain == "12532609583862916517") {
        destination = "Polygon Mumbai";
      } else if (destinationChain == "14767482510784806043") {
        destination = "Avalanche Fuji";
      } else if (destinationChain == "5790810961207155433") {
        destination = "Base Goerli";
      } else if (destinationChain == "3478487238524512106") {
        destination = "Arbitrum Sepolia";
      }

      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          user: account.address,
          txhash: tx.hash,
          payee,
          amount: parseFloat(amount),
          source: "Ethereum Sepolia",
          destination,
          time: created_at
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Transaction successful",
        description: `Transaction hash: ${tx.hash}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Transaction failed",
        description: "Transaction failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleRepay = async () => {
    setLoading(true);
    try {
      const tx = await repay.writeAsync();

      toast({
        title: "Transaction successful",
        description: `Transaction hash: ${tx.hash}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Transaction failed",
        description: "Transaction failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleTopup = async () => {
    setLoading(true);
    try {
      const tx = await topup.writeAsync();

      toast({
        title: "Transaction successful",
        description: `Transaction hash: ${tx.hash}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Transaction failed",
        description: "Transaction failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const tx = await withdraw.writeAsync();

      toast({
        title: "Transaction successful",
        description: `Transaction hash: ${tx.hash}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Transaction failed",
        description: "Transaction failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  }; 
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
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
              <Tab>Collateral</Tab>
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
                    <Input placeholder='Enter GHO amount' onChange={(e) => setAmount(e.target.value)} />
                    <InputRightAddon>
                      <Image src="/gho.svg" boxSize="30px" /> &nbsp; GHO
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} mb={4}>
                  <FormLabel>Destination chain</FormLabel>
                  <Select placeholder="Select chain" onChange={(e) => setDestinationChain(e.target.value)}>
                    <option value={"16015286601757825753"}>Ethereum Sepolia</option>
                    <option value={"2664363617261496610"}>Optimism Goerli</option>
                    <option value={"12532609583862916517"}>Polygon Mumbai</option>
                    <option value={"14767482510784806043"}>Avalanche Fuji</option>
                    <option value={"5790810961207155433"}>Base Goerli</option>
                    <option value={"3478487238524512106"}>Arbitrum Sepolia</option>
                  </Select>
                </FormControl>
                <Button isLoading={isLoading} {...buttonStyle} onClick={handlePay}>Pay</Button>
              </TabPanel>
              <TabPanel>
                {result1?.data &&
                  <>
                  {(result1?.data as any)[0]?.status == "success" ?
                    <>
                      <StatGroup>
                        <Stat>
                          <StatLabel>Available for borrow & pay</StatLabel>
                          <StatNumber>
                            <Flex as='h4' align='center'>
                              <Heading size='lg' mr="3">
                                {(Number((result1?.data as any)[0]?.result[2]) / 10 ** 8).toFixed(2)}
                              </Heading>
                              <Image src="/gho.svg" boxSize="30px" mr="1" />
                              <Heading size='lg'>
                                GHO
                              </Heading>
                            </Flex>
                          </StatNumber>
                          <StatHelpText>
                            2.02%
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                      <br/>
                      <StatGroup>
                        <Stat>
                          <StatLabel>Total Collateral</StatLabel>
                          <StatNumber>
                            ${(Number((result1?.data as any)[0]?.result[0]) / 10 ** 8).toFixed(2)}
                          </StatNumber>
                          <StatHelpText>
                            0%
                          </StatHelpText>
                        </Stat>

                        <Stat>
                          <StatLabel>Debt</StatLabel>
                          <StatNumber>
                            {(Number((result1?.data as any)[0]?.result[1]) / 10 ** 8).toFixed(2)} GHO
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
                  </>
                }
                <FormControl mt={8}>
                  <FormLabel>Repay Debt</FormLabel>
                  <InputGroup>
                    <Input placeholder='Enter GHO amount' onChange={(e) => setAmount(e.target.value)} />
                    <InputRightAddon>
                      <Image src="/gho.svg" boxSize="30px" /> &nbsp; GHO
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
                <Button isLoading={isLoading} {...buttonStyle} onClick={handleRepay}>Repay</Button>
              </TabPanel>
              <TabPanel>
                {result1?.data &&
                  <>
                  {(result1?.data as any)[2]?.status == "success" ?
                    <Flex as='h4' align='center'>
                      <Heading size='md' mr="2">
                        Collateral: &nbsp; {Number((result1?.data as any)[2]?.result) / 10 ** 18}
                      </Heading>
                      <Image src="/weth.svg" boxSize="30px" mr="2" />
                      <Heading size='md'>
                        WETH
                      </Heading>
                    </Flex>
                    :
                    <Box>
                      <p>Not connected</p>
                    </Box>
                  }
                  </>
                }
                <FormLabel mt={6}>Add collateral</FormLabel>
                <FormControl mt={4}>
                  <SimpleGrid columns={2} spacing={5}>
                    <Input placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
                    <Select placeholder="Select collateral asset" defaultValue={"ETH"} onChange={(e) => setCollateral(e.target.value)}>
                      <option value={"ETH"}>ETH</option>
                      <option value={"WETH"}>WETH</option>
                      <option value={"WBTC"}>WBTC</option>
                    </Select>
                  </SimpleGrid>
                </FormControl>
                <Button isLoading={isLoading} {...buttonStyle} onClick={handleTopup}>Top-up</Button>
                <FormLabel mt={8}>Withdraw collateral</FormLabel>
                <FormControl mt={4}>
                  <SimpleGrid columns={2} spacing={5}>
                    <Input placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
                    <Select placeholder="Select collateral asset" defaultValue={"ETH"} onChange={(e) => setCollateral(e.target.value)}>
                      <option value={"ETH"}>ETH</option>
                      <option value={"WETH"}>WETH</option>
                      <option value={"WBTC"}>WBTC</option>
                    </Select>
                  </SimpleGrid>
                </FormControl>
                <Button isLoading={isLoading} {...buttonStyle} onClick={handleWithdraw}>Withdraw</Button>
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
