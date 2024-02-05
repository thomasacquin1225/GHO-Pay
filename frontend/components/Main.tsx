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
  Image,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { sendPaymentOperation } from "../accountKit";

import {
  useAccount,
  useContractReads,
  useContractWrite,
  useSignTypedData,
} from "wagmi";
import { createClient } from "@supabase/supabase-js";
import { deployedContracts } from "@/contracts/deployedContracts";

const TabbedForms = () => {
  const buttonStyle = {
    width: "600px",
    mt: 2,
    bg: "black",
    color: "white",
  };

  const router = useRouter();
  const toast = useToast();
  const supabase = createClient(
    "https://vidwrnyawsvghekqwfjj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZHdybnlhd3N2Z2hla3F3ZmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3ODM5MjAsImV4cCI6MjAyMTM1OTkyMH0.0v5_eHojJILV65lYsg2VCpVkzgeNUJ4sXkeTBXHykyY"
  );

  const [mounted, setMounted] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [payee, setPayee] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.00");
  const [destinationChain, setDestinationChain] = useState<string>(
    "16015286601757825753"
  );
  const [collateral, setCollateral] = useState<string>("ETH");
  const [maxBorrow, setMaxBorrow] = useState<string>("0.00");

  const account = useAccount();
  const { signTypedData } = useSignTypedData();
  const result1 = useContractReads({
    contracts: [
      {
        ...deployedContracts[11155111].GHOPay,
        functionName: "getUserAccountData",
        args: [account.address as any],
      },
      {
        ...deployedContracts[11155111].GHOPay,
        functionName: "getGHOBalance",
        args: [account.address as any],
      },
      {
        ...deployedContracts[11155111].GHOPay,
        functionName: "getDepositedETH",
        args: [account.address as any],
      },
    ],
  });

  const pay = useContractWrite({
    ...deployedContracts[11155111].GHOPay,
    functionName: "pay",
    args: [
      payee as any,
      BigInt(parseFloat(amount) * 10 ** 18),
      BigInt(destinationChain),
    ],
  });

  const repay = useContractWrite({
    ...deployedContracts[11155111].GHOPay,
    functionName: "repay",
    args: [BigInt(parseFloat(amount) * 10 ** 18)],
  });

  const topup = useContractWrite({
    ...deployedContracts[11155111].GHOPay,
    functionName: "topup",
    value: BigInt(parseFloat(amount) * 10 ** 18),
    args: [
      "0x0000000000000000000000000000000000000000" as any,
      BigInt(parseFloat(amount) * 10 ** 18),
    ],
  });

  const withdraw = useContractWrite({
    ...deployedContracts[11155111].GHOPay,
    functionName: "withdraw",
    args: [
      "0x0000000000000000000000000000000000000000" as any,
      "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830" as any,
      BigInt(parseFloat(amount) * 10 ** 18),
    ],
  });

  const handlePay = async () => {
    setLoading(true);
    try {
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
      const txHash = await sendPaymentOperation({
        apiKey: "XMV7KckmkY8h8QAoTqX9Xr0q9zC4fhC0",
        privateKey:
          "fbf992b0e25ad29c85aae3d69fcb7f09240dd2588ecee449a4934b9e499102cc",
        args: [payee, amount, destinationChain],
        policyId: "d957a568-8392-4c56-82ed-224245e8f5e2",
      });

      const { data, error } = await supabase.from("transactions").insert([
        {
          user: account.address,
          txhash: txHash,
          payee,
          amount: parseFloat(amount),
          source: "Ethereum Sepolia",
          destination,
          time: created_at,
        },
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Transaction successful",
        description: `Transaction hash: ${txHash}`,
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
    if (result1?.data) {
      if ((result1?.data as any)[0]?.status == "success") {
        setMaxBorrow(
          (Number((result1?.data as any)[0]?.result[2]) / 10 ** 8 / 2).toFixed(
            2
          )
        );
      }
    }
  }, []);

  if (!mounted) return <></>;
  return (
    <Flex direction="column" pt={9}>
      <Flex flex={1} alignItems="center" justifyContent="center" p={4}>
        <Box
          boxShadow="lg"
          borderRadius="xl"
          minW={{ base: "300px", sm: "400px", md: "600px" }}
        >
          <Box
            p={4}
            boxShadow="xs"
            bg="white"
            borderRadius="xl"
            minW={{ base: "90%", sm: "lg" }}
            w="full"
          >
            <Tabs isFitted>
              <TabList mb="1em">
                <Tab sx={{ fontWeight: "bold" }}>Pay</Tab>
                <Tab sx={{ fontWeight: "bold" }}>Wallet</Tab>
                <Tab sx={{ fontWeight: "bold" }}>Collateral</Tab>
              </TabList>
              <TabPanels height="sm">
                <TabPanel>
                  <FormControl>
                    <FormLabel>To</FormLabel>
                    <Input
                      placeholder="Enter payee address"
                      onChange={(e) => setPayee(e.target.value)}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Amount (Max: {maxBorrow} GHO)</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="Enter GHO amount"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <InputRightAddon>
                        <Image src="/gho.svg" boxSize="30px" /> &nbsp; GHO
                      </InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <FormControl mt={4} mb={4}>
                    <FormLabel sx={{ fontWeight: "bold" }}>
                      Destination chain
                    </FormLabel>
                    <Select
                      placeholder="Select chain"
                      defaultValue={"16015286601757825753"}
                      onChange={(e) => setDestinationChain(e.target.value)}
                    >
                      <option value={"16015286601757825753"}>
                        Ethereum Sepolia
                      </option>
                      <option value={"2664363617261496610"}>
                        Optimism Goerli
                      </option>
                      <option value={"12532609583862916517"}>
                        Polygon Mumbai
                      </option>
                      <option value={"14767482510784806043"}>
                        Avalanche Fuji
                      </option>
                      <option value={"5790810961207155433"}>Base Goerli</option>
                      <option value={"3478487238524512106"}>
                        Arbitrum Sepolia
                      </option>
                    </Select>
                  </FormControl>
                  <Button
                    isLoading={isLoading}
                    {...buttonStyle}
                    onClick={handlePay}
                  >
                    Pay
                  </Button>
                  {account.isConnected && (
                    <Box textAlign={"center"} mt={4}>
                      <Button
                        colorScheme="teal"
                        variant="link"
                        color="#3a3a3a"
                        onClick={() => router.push("/transactions")}
                      >
                        Transaction History
                      </Button>
                    </Box>
                  )}
                </TabPanel>
                <TabPanel>
                  {result1?.data && (
                    <>
                      {(result1?.data as any)[0]?.status == "success" ? (
                        <>
                          <StatGroup>
                            <Stat>
                              <StatLabel>Available for borrow & pay</StatLabel>
                              <StatNumber>
                                <Flex as="h4" align="center">
                                  <Heading size="lg" mr="3">
                                    {(
                                      Number(
                                        (result1?.data as any)[0]?.result[2]
                                      ) /
                                      10 ** 8
                                    ).toFixed(2)}
                                  </Heading>
                                  <Image src="/gho.svg" boxSize="30px" mr="1" />
                                  <Heading size="lg">GHO</Heading>
                                </Flex>
                              </StatNumber>
                              <StatHelpText>2.02%</StatHelpText>
                            </Stat>
                          </StatGroup>
                          <br />
                          <StatGroup>
                            <Stat>
                              <StatLabel>Total Collateral</StatLabel>
                              <StatNumber>
                                $
                                {(
                                  Number((result1?.data as any)[0]?.result[0]) /
                                  10 ** 8
                                ).toFixed(2)}
                              </StatNumber>
                              <StatHelpText>0%</StatHelpText>
                            </Stat>

                            <Stat>
                              <StatLabel>Debt</StatLabel>
                              <StatNumber>
                                {(
                                  Number((result1?.data as any)[0]?.result[1]) /
                                  10 ** 8
                                ).toFixed(2)}{" "}
                                GHO
                              </StatNumber>
                              <StatHelpText>2.02%</StatHelpText>
                            </Stat>
                          </StatGroup>
                        </>
                      ) : (
                        <Box>
                          <p>Not connected</p>
                        </Box>
                      )}
                    </>
                  )}
                  <FormControl mt={8}>
                    <FormLabel>Repay Debt</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="Enter GHO amount"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <InputRightAddon>
                        <Image src="/gho.svg" boxSize="30px" /> &nbsp; GHO
                      </InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <Button
                    isLoading={isLoading}
                    {...buttonStyle}
                    onClick={handleRepay}
                  >
                    Repay
                  </Button>
                </TabPanel>
                <TabPanel>
                  {result1?.data && (
                    <>
                      {(result1?.data as any)[2]?.status == "success" ? (
                        <Flex as="h4" align="center">
                          <Heading size="md" mr="2">
                            Collateral: &nbsp;{" "}
                            {Number((result1?.data as any)[2]?.result) /
                              10 ** 18}
                          </Heading>
                          <Image src="/weth.svg" boxSize="30px" mr="2" />
                          <Heading size="md">WETH</Heading>
                        </Flex>
                      ) : (
                        <Box>
                          <p>Not connected</p>
                        </Box>
                      )}
                    </>
                  )}
                  <FormLabel mt={6}>Add collateral</FormLabel>
                  <FormControl mt={4}>
                    <SimpleGrid columns={2} spacing={5}>
                      <Input
                        placeholder="Enter amount"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <Select
                        placeholder="Select collateral asset"
                        defaultValue={"ETH"}
                        onChange={(e) => setCollateral(e.target.value)}
                      >
                        <option value={"ETH"}>ETH</option>
                        <option value={"WETH"}>WETH</option>
                        <option value={"WBTC"}>WBTC</option>
                      </Select>
                    </SimpleGrid>
                  </FormControl>
                  <Button
                    isLoading={isLoading}
                    {...buttonStyle}
                    onClick={handleTopup}
                  >
                    Top-up
                  </Button>
                  <FormLabel mt={8}>Withdraw collateral</FormLabel>
                  <FormControl mt={4}>
                    <SimpleGrid columns={2} spacing={5}>
                      <Input
                        placeholder="Enter amount"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <Select
                        placeholder="Select collateral asset"
                        defaultValue={"ETH"}
                        onChange={(e) => setCollateral(e.target.value)}
                      >
                        <option value={"ETH"}>ETH</option>
                        <option value={"WETH"}>WETH</option>
                        <option value={"WBTC"}>WBTC</option>
                      </Select>
                    </SimpleGrid>
                  </FormControl>
                  <Button
                    isLoading={isLoading}
                    {...buttonStyle}
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
      <Divider mt={2} />
      {account.isConnected && (
        <Flex flex={1} alignItems="center" justifyContent="center" p={4}>
          <Button
            {...buttonStyle}
            ml={4}
            mr={4}
            onClick={() =>
              signTypedData({
                types: {
                  Permit: [
                    {
                      name: "owner",
                      type: "address",
                    },
                    {
                      name: "spender",
                      type: "address",
                    },
                    {
                      name: "value",
                      type: "uint256",
                    },
                    {
                      name: "nonce",
                      type: "uint256",
                    },
                    {
                      name: "deadline",
                      type: "uint256",
                    },
                  ],
                },
                domain: {
                  name: "Aave Variable Debt Sepolia GHO",
                  version: "1",
                  chainId: 11155111,
                  verifyingContract:
                    "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844",
                },
                primaryType: "Permit",
                message: {
                  owner: account.address,
                  spender: "0x1D16089138D24a4007Ae367ef30568f964b55041",
                  value: BigInt(parseFloat("1000000000") * 10 ** 18),
                  nonce: 5,
                  deadline: new Date().getTime() + 1000 * 60 * 60 * 24,
                },
              })
            }
          >
            Approve Credit Delegation
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default TabbedForms;
