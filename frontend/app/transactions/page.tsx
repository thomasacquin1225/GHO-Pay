"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { useAccount } from 'wagmi';
import { createClient } from '@supabase/supabase-js';

export default function TransactionsPage() {
  const router = useRouter();
  const account = useAccount();

  const supabase = createClient(
    'https://vidwrnyawsvghekqwfjj.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZHdybnlhd3N2Z2hla3F3ZmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3ODM5MjAsImV4cCI6MjAyMTM1OTkyMH0.0v5_eHojJILV65lYsg2VCpVkzgeNUJ4sXkeTBXHykyY'
  );

  type Transaction = {
    txhash: string;
    payee: string;
    amount: number;
    source: string;
    destination: string;
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!account) return;
    const getTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user', account.address)
        .order('time', { ascending: false });
      if (error) console.log('error', error);
      else setTransactions(data);
    }
    getTransactions();
  }, []);

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
                  <Td>
                    <Box maxWidth="300px" isTruncated>
                      <a href={`https://ccip.chain.link/tx/${tx.txhash}`} target="_blank">{tx.txhash}</a>
                    </Box>
                  </Td>
                  <Td>
                    <Box maxWidth="200px" isTruncated>
                      {tx.payee}
                    </Box>
                  </Td>
                  <Td isNumeric>{tx.amount} GHO</Td>
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
