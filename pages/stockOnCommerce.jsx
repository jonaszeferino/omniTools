import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
import WalkthroughPopover from "./infosStockCommerce";
import { useState } from "react";
import {
  Button,
  FormLabel,
  Input,
  Heading,
  InputGroup,
  InputLeftAddon,
  ChakraProvider,
  Progress,
  Select,
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";

export default function Stocks() {
  let [stock, setStock] = useState([]);
  let [stockUser, setStockUser] = useState("leposticheoms");
  let [stockAvailability, setStockAvailability] = useState();
  let [stockChannel, setStockChannel] = useState("2");
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setError] = useState(null);
  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );

  const apiCall = async () => {
    setIsLoading(true);
    setDateFile(dateFile);
    try {
      const response = await fetch("/api/v1/stockCommerce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: stockChannel,
          user: stockUser,
          availability: stockAvailability,
        }),
      });
      const data = await response.json();
      setStock(data.Result);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const csvData = stock.map((stockCsv) => [
    stockCsv.WarehouseName,
    stockCsv.ProductID,
    stockCsv.StockBalance,
    stockCsv.availability,
  ]);

  return (
    <>
      <ChakraProvider>
        <Heading as="h1" size="xl" textAlign="center">
          Estoque por Canal - Linx Commerce
        </Heading>
        <Heading as="h3" size="xs" textAlign="center">
          Stock by Channel
        </Heading>

        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">ClientId</InputLeftAddon>
              <Input
                size="md"
                id="test1"
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
              <InputLeftAddon size="md">Disponibilidade</InputLeftAddon>

              <Select
                size="md"
                value={stockAvailability}
                onChange={(event) => setStockAvailability(event.target.value)}
              >
                <option value="B">Ambos</option>
                <option value="I">Habilitado</option>
                <option value="O">Desabilitado</option>
              </Select>
            </InputGroup>
          </FormLabel>
          <WalkthroughPopover />
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
          {csvData.length > 0 ? (
            <CSVLink
              data={csvData}
              headers={["Estoque", "ProductID", "Balanço", "Disponibilidade"]}
              separator={";"}
              filename={`estoque_${stockUser}_${dateFile}`}
            >
              <Button
                padding={5}
                rounded={8}
                size="lg"
                mx="auto"
                colorScheme="purple"
                my={4}
                ml={4}
              >
                Exportar para CSV
              </Button>
            </CSVLink>
          ) : null}
          <br />
          {isLoading ? <Progress size="xs" isIndeterminate /> : null}
        </div>

        <br />
        <div style={{ maxWidth: "100%" }}>
          <div
            className={styles.grid}
            style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
          >
            {stock.map((stockView) => (
              <div className={styles.card} key={stockView.ProductID}>
                <span>Estoque: {stockView.WarehouseName}</span> <br />
                <span>ProductID: {stockView.ProductID}</span> <br />
                <span>Balanço: {stockView.StockBalance}</span> <br />
                <span>
                  Disponibilidade:{" "}
                  {stockView.availability === "I"
                    ? "Habilitado"
                    : "Desabilitado"}
                </span>{" "}
                <br />
              </div>
            ))}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}
