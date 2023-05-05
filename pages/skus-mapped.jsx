import styles from "../styles/Home.module.css";

import { useState } from "react";
import {
  Button,
  Heading,
  ChakraProvider,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

export default function Stocks() {
  let [analyzes, setAnalyzes] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [message, setMessage] = useState(false);
  let [isError, setError] = useState(null);
  let [clientIdView, setClientIdview] = useState("");

  const apiCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/getSkusMapped", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: clientIdView,
          
        }),
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados.");
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
        <Topbar title="Analises " />
        <TopbarBelow />
        <Heading as="h1" size="m" textAlign="center">
          Skus Mapeados
        </Heading>
        <br />
        <div
          style={{
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <FormControl maxWidth="800px" mx="auto" mb={4}>
            <FormLabel htmlFor="clientId">Cliente:</FormLabel>
            <Input
              id="clientId"
              name="clientId"
              type="text"
              value={clientIdView}
              onChange={(event) => setClientIdview(event.target.value)}
            />
          </FormControl>
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
        <br />

        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "50%",
              marginLeft: "auto",
              maxWidth: "auto",
              marginRight: "auto",
            }}
          >

            <Table
              variant="striped"
              colorScheme="purple"
              size="sm"
              maxW="400px"
            >
              <TableCaption>Skus que estão mapeados</TableCaption>
              <Thead>
                <Tr>
                  <Th>Cliente</Th>
                  <Th>ProductId</Th>
                  <Th>SKU</Th>
                </Tr>
              </Thead>
              <Tbody>
                {analyzes.map((analyzesStockView) => (
                  <Tr key={analyzesStockView.sku}>
                    <Td>{analyzesStockView.clientIdOms}</Td>
                    <Td>{analyzesStockView.productid}</Td>
                    <Td>{analyzesStockView.sku}</Td>
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
