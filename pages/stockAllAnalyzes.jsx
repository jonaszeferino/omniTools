import styles from "../styles/Home.module.css";
import { format } from "date-fns";
import { useState } from "react";
import {
  Button,
  Heading,
  ChakraProvider,
  Progress,
  Table, Thead, Tbody, Tr, Th, Td, TableCaption 
  } from "@chakra-ui/react";


export default function Stocks() {
  let [analyzes, setAnalyzes] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [message, setMessage] = useState(false);
  let [isError, setError] = useState(null);
  
  const apiCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/getStockAnalyzes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados.');
      }
      const data = await response.json();
      setAnalyzes(data.results);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <ChakraProvider>
        <Heading as="h1" size="xl" textAlign="center">
          Analises 
        </Heading>
        <Heading as="h1" size="m" textAlign="center">
        ⚠️ 🚧 Em construção 🚧 ⚠️
        </Heading>
        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Button
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            colorScheme="purple"
            onClick={apiCall}
          >
            Verificar{" "}
          </Button>
         
           <br />
          {isLoading ? <Progress size="xs" isIndeterminate /> : null}
    </div>

        <br />
        <div style={{ maxWidth: "100%" }}>
          <div
            
            style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
          >
  <Table variant='striped' colorScheme='purple' size='sm' maxW='400px'>
  <TableCaption>Resultados de análise</TableCaption>
  <Thead>
    <Tr>
      <Th>Plataforma</Th>
      <Th>Nome do teste</Th>
      <Th>Cliente</Th>
      <Th minWidth="50px">Data</Th>
    </Tr>
  </Thead>
  <Tbody>
    {analyzes.map((analyzesStockView) => (
      <Tr key={analyzesStockView.clientId_oms}>
        <Td>OMS</Td>
        <Td>{analyzesStockView.view_name}</Td>
        <Td>{analyzesStockView.clientId_oms}</Td>
        <Td minW="50px">{format(new Date(analyzesStockView.created_date), "dd-MM-yyyy")}</Td>
      </Tr>
    ))}
  </Tbody>
</Table>

          </div>
        </div>
      </ChakraProvider>
    </>
  );
}
