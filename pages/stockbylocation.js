import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  FormLabel,
  Input,
  Heading,
  InputGroup,
  InputLeftAddon,
  ChakraProvider,
  Progress,
  Flex,
} from "@chakra-ui/react";
import { format, differenceInDays } from "date-fns";

export default function Stocks() {
  const [stock, setStock] = useState([]);
  const [stockUser, setStockUser] = useState();
  const [stockChannel, setStockChannel] = useState();
  const [stockLocation, setStockLocation] = useState();

  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get("/api/v1/stocks", {
        params: {
          stockUser: stockUser,
          stockChannel: stockChannel,
          stockLocation: stockLocation,
        },
      });
      setStock(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setIsLoading(false);
    }
  };

  let stockCards = null;

  if (isLoading) {
    stockCards = (
      <Flex justify="center" align="center" height="300px">
        <Progress size="lg" isIndeterminate />
      </Flex>
    );
  } else if (isError) {
    stockCards = (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Erro ao buscar estoque!</AlertTitle>
        <AlertDescription>
          Ocorreu um erro ao buscar o estoque. Por favor, tente novamente mais
          tarde.
        </AlertDescription>
      </Alert>
    );
  } else if (stock.length > 0) {
    stockCards = (
      <div className={styles.grid}>
        {stock.map((stockView) => (
          <div className={styles.card} key={stockView.id}>
            <span>Pedido: {stockView.orderId}</span>{" "}
            <span>Cliente: {stockView.clientId}</span> <br />
            <span>Location: {stockView.locationId}</span> <br />
            <span>Sku: {stockView.skuId}</span> <br />
            <span>Quantidade: {stockView.balance}</span> <br />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <ChakraProvider>
        <Heading as="h1" size="xl" textAlign="center">
          Estoque por filial
        </Heading>
        <Heading as="h3" size="xs" textAlign="center">
          Stock by locationId
        </Heading>

        <br />

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">ClientId</InputLeftAddon>
              <Input
                size="md"
                value={stockUser}
                onChange={(event) => setStockUser(event.target.value)}
              ></Input>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Canal</InputLeftAddon>
              <Input
                size="md"
                value={stockChannel}
                onChange={(event) => setStockChannel(event.target.value)}
              ></Input>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Location</InputLeftAddon>
              <Input
                size="md"
                value={stockLocation}
                onChange={(event) => setStockLocation(event.target.value)}
              ></Input>
            </InputGroup>
          </FormLabel>
        </div>

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
        </div>
        <br />

        <div style={{ maxWidth: "100%" }}>
          <div
            className={styles.grid}
            style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
          >
            {stock.map((stockView) => (
              <div className={styles.card} key={stockView.id}>
                <span>Pedido: {stockView.orderId}</span>{" "}
                <span>Cliente: {stockView.clientId}</span> <br />
                <span>Location: {stockView.locationId}</span> <br />
                <span>Sku: {stockView.skuId}</span> <br />
                <span>Quantidade: {stockView.balance}</span> <br />
              </div>
            ))}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}
