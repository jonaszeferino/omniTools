import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Select,
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

export default function Stocks() {
  let [stock, setStock] = useState([]);
  let [stockUser, setStockUser] = useState("lepostiche");
  let [stockChannel, setStockChannel] = useState("site");
  let [stockLocation, setStockLocation] = useState(190410);
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setError] = useState(null);
  let [locations, setLocations] = useState([]);
  let [channels, setChannels] = useState([]);

  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );

  const apiCall = async () => {
    setIsLoading(true);
    setDateFile(dateFile);
    try {
      const response = await fetch("/api/v1/getStockFromLocationOms", {
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
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const apiCallChannels = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/getOmsChannels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: stockUser,
        }),
      });
      const data = await response.json();
      setChannels(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  console.log(channels);

  const apiCallLocations = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/getOmsLocations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: stockUser,
        }),
      });
      const data = await response.json();
      setLocations(data);
      locations.sort((a, b) => a.id - b.id);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(locations);

  const csvData = stock.map((stockCsv) => [
    stockCsv.clientId,
    stockCsv.locationId,
    stockCsv.updatedAt,
    stockCsv.skuId,
    stockCsv.balance,
    stockCsv.totalQuantity,
    stockCsv.reservedQuantity,
    stockCsv.availableQuantity,
    format(new Date(), "dd/MM/yyyy HH:mm:ss"),
  ]);

  

  return (
    <>
      <ChakraProvider>
        <Topbar title="Estoque por Filial OMS " />
        <TopbarBelow />
        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">ClientId</InputLeftAddon>
              <Input
                size="md"
                value={stockUser}
                onChange={(event) => setStockUser(event.target.value)}
                onBlur={apiCallChannels}
              ></Input>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Canal</InputLeftAddon>
              <Select
                size="md"
                value={stockChannel}
                onChange={(event) => setStockChannel(event.target.value)}
                onBlur={apiCallLocations}
              >
                {channels.map((item, index) => (
                  <option key={index} value={item.channelId}>
                    {item.channelId}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Location</InputLeftAddon>
              <Select
                size="md"
                value={stockLocation}
                onChange={(event) => setStockLocation(event.target.value)}
              >
                {locations.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.id}{" - "}{item.name}
                    
                  </option>
                ))}
              </Select>
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
          {csvData.length > 0 ? (
            <CSVLink
              data={csvData}
              headers={[
                "cliente",
                "filial",
                "ultimaModificação",
                "sku",
                "balanço",
                "total",
                "reservado",
                "disponivel",
                "dataDaConsulta",
              ]}
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
          {csvData.length > 0 ? (
            <h1>
              <strong>Cliente: </strong>
              {stockUser} <strong>Canal: </strong> {stockChannel}{" "}
              <strong>Filial: </strong>
              {stockLocation}{" "}
            </h1>
          ) : null}
          {isLoading ? <Progress size="xs" isIndeterminate /> : null}
        </div>

        <br />
        <br />
        <br />
        <br />
        <div style={{ maxWidth: "100%" }}>
          <div
            className={styles.grid}
            style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Table
              variant="striped"
              colorScheme="purple"
              size="sm"
              maxW="400px"
            >
              <TableCaption>Resultados de estoque</TableCaption>
              <Thead>
                <Tr>
                  <Th>SkuId</Th>
                  <Th>Balanço</Th>
                  <Th>Qtd Total</Th>
                  <Th>Reservados</Th>
                  <Th>Disponíveis</Th>
                  <Th>Filial</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stock.map((stockView) => (
                  <Tr key={stockView.id}>
                    <Td>{stockView.skuId}</Td>
                    <Td>{stockView.balance}</Td>
                    <Td>{stockView.totalQuantity}</Td>
                    <Td>{stockView.reservedQuantity}</Td>
                    <Td>{stockView.availableQuantity}</Td>
                    <Td>{stockView.locationId}</Td>
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
