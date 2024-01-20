"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
  Heading,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";

export default function TransactionsPage() {
  const router = useRouter();
  // Dummy data for the transactions
  const transactions = [
    {
      hash: "0x01b7d2a8e25698a525f3a0......",
      address: "0x01b7d2a8e25698a525f3a0......",
      amount: 20,
      source: "Sepolia",
      destination: "Mumbai",
    },
    {
      hash: "0x01b7d2a8e25698a525f3a0......",
      address: "0x01b7d2a8e25698a525f3a0......",
      amount: 15,
      source: "Sepolia",
      destination: "Sepolia",
    },
    {
      hash: "0x01b7d2a8e25698a525f3a0......",
      address: "0x01b7d2a8e25698a525f3a0......",
      amount: 103,
      source: "Sepolia",
      destination: "Base goerli",
    },
  ];

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={8} mt={20}>
        <Heading as="h1" size="xl" mb={6} textAlign="left">
          Transactions
        </Heading>
        <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Transaction hash</Th>
                <Th>Payee address</Th>
                <Th isNumeric>Amount</Th>
                <Th>Source</Th>
                <Th>Destination</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((tx, index) => (
                <Tr key={index}>
                  <Td>{tx.hash}</Td>
                  <Td>{tx.address}</Td>
                  <Td isNumeric>{tx.amount}</Td>
                  <Td>{tx.source}</Td>
                  <Td>{tx.destination}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex direction={"row"} mt={4}>
          <Spacer />{" "}
          <Button
            mt={4}
            bg={"black"}
            color={"white"}
            onClick={() => router.push("/")}
          >
            Go back
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
}
