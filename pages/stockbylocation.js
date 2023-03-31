import styles from "../styles/Home.module.css";
import { useState } from "react";
import {
  Button,
  FormLabel,
  Input,
  Heading,
  InputGroup,
  InputLeftAddon,
  ChakraProvider,
} from "@chakra-ui/react";

export default function Stocks() {
  const [stock, setStock] = useState([]);
  const [stockUser, setStockUser] = useState("lepostiche");
  const [stockChannel, setStockChannel] = useState("site");
  const [stockLocation, setStockLocation] = useState(190410);

  const apiCall = async () => {
    try {
      const response = await fetch("/api/v1/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: stockLocation,
          channel: stockChannel,
          user: stockUser,
        }),
      });

      const data = await response.json();
      setStock(data);
      // console.log("client", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("aqui", stock);
  console.log(
    "aqui",
    JSON.stringify({
      location: stockLocation,
      channel: stockChannel,
      user: stockUser,
    })
  );

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
        {/* <span>Cliente: {stockUser}</span>
        <br />
        <span>Canal: {stockChannel}</span>
        <br />
        <span>Filial: {stockLocation}</span> */}
        <br />
        <br />

        <div style={{ maxWidth: "100%" }}>
          <div
            className={styles.grid}
            style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
          >
            {stock.map((stockView) => (
              <div className={styles.card} key={stockView.id}>
                <span>SkuId: {stockView.skuId}</span> <br />
                <span>Balanço: {stockView.balance}</span> <br />
                <span>Qtd Total: {stockView.totalQuantity}</span> <br />
                <span>Reservados: {stockView.reservedQuantity}</span> <br />
                <span>Disponiveis: {stockView.availableQuantity}</span> <br />
              </div>
            ))}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}
