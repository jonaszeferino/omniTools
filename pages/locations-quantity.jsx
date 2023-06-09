/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useState, useEffect } from "react";
import React from "react";
import { format, differenceInDays } from "date-fns";
import { CSVLink } from "react-csv";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  FormLabel,
  Input,
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
  Text,
  TableCaption,
  Badge,
  Stack,
  Select,
  Heading,
} from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

export default function orders() {
  let [orderUser, setOrderUser] = useState();
  let [isError, setError] = useState(null);
  let [totalResults, setTotalResults] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [dateFile, setDateFile] = useState(format(new Date(), "dd_MM_yyyy_HH_mm_ss"));
  let [locations, setLocations] = useState([]);
  const [message, setMessage] = useState("");
  const [totalYes, setTotalYes] = useState(0);
  const [totalNo, setTotalNo] = useState(0);
  const [stockPage, setStockPage] = useState(1);
  const [analysisName, setAnalysisName] = useState("name_analise");
  const [showAlert, setShowAlert] = useState(false);

  //liberar tela
  const [password, setPassword] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const correctPassword = "onni";

  const apiCall = async () => {
    setShowAlert(false);
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/getOmsLocations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: orderUser,
          page: stockPage,
        }),
      });
      const data = await response.json();
      setLocations(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const csvData = locations.map((locationsCSV) => [
    orderUser,
    locationsCSV.id,
    locationsCSV.name,
    locationsCSV.canPickupInStore ? "Sim" : "Não",
    locationsCSV.canReceiveFromStore ? "Sim" : "Não",
    locationsCSV.canShipToStore ? "Sim" : "Não",
    locationsCSV.canShipToCustomer ? "Sim" : "Não",
    locationsCSV.canShipToLocker ? "Sim" : "Não",
    locationsCSV.canReserveInStore ? "Sim" : "Não",
    locationsCSV.enabled ? "Sim" : "Não",
    locationsCSV.channels[0] ? "Sim" : "Não",
    (locationsCSV.canPickupInStore ||
      locationsCSV.canReceiveFromStore ||
      locationsCSV.canShipToStore ||
      locationsCSV.canShipToCustomer ||
      locationsCSV.canShipToLocker ||
      locationsCSV.canReserveInStore) &&
    locationsCSV.enabled &&
    locationsCSV.channels.length > 0 &&
    locationsCSV.channels[0]
      ? "SIM"
      : "NÃO",
  ]);

  const totals = locations.map((totalsView) => [
    (totalsView.canPickupInStore ||
      totalsView.canReceiveFromStore ||
      totalsView.canShipToStore ||
      totalsView.canShipToCustomer ||
      totalsView.canShipToLocker ||
      totalsView.canReserveInStore) &&
    totalsView.enabled &&
    totalsView.channels.length > 0 &&
    totalsView.channels[0]
      ? "SIM"
      : "NÃO",
  ]);

  useEffect(() => {
    const totals = locations.reduce(
      (accumulator, totalsView) => {
        const isActiveFlow =
          totalsView.canPickupInStore ||
          totalsView.canReceiveFromStore ||
          totalsView.canShipToStore ||
          totalsView.canShipToCustomer ||
          totalsView.canShipToLocker ||
          totalsView.canReserveInStore;
        const isEnabledAndChannel =
          totalsView.enabled &&
          totalsView.channels.length > 0 &&
          totalsView.channels[0];

        if (isActiveFlow && isEnabledAndChannel) {
          accumulator.sim += 1;
        } else {
          accumulator.nao += 1;
        }
        return accumulator;
      },
      { sim: 0, nao: 0 }
    );

    setTotalYes(totals.sim);
    setTotalNo(totals.nao);
  }, [locations]);

  const dataToSend = {
    stockData: locations.map((item) => {
      const isAnyFlowActive =
        item.canPickupInStore ||
        item.canReceiveFromStore ||
        item.canReserveInStore ||
        item.canShipToCustomer ||
        item.canShipToStore ||
        item.canShipToLocker;
      const isEnabledAndChannel =
        item.enabled && (item.channels.length > 0 && item.channels[0]);

      return {
        alias: item.alias || null,
        enabled: item.enabled || null,
        clientId: item.clientId || null,
        canPickupInStore: item.canPickupInStore || null,
        canReceiveFromStore: item.canReceiveFromStore || null,
        canReserveInStore: item.canReserveInStore || null,
        canShipToCustomer: item.canShipToCustomer || null,
        canShipToStore: item.canShipToStore || null,
        canShipToLocker: item.canShipToLocker || null,
        createdAt: item.createdAt || null,
        description: item.description || null,
        channelsActive: isEnabledAndChannel ? true : false,
        anyFlowActive: isEnabledAndChannel && isAnyFlowActive ? true : false,
        insertDate: new Date().toISOString(),
        analysisName: analysisName,
        page: stockPage,
      };
    }),
  };

  const totalFlows = locations.reduce(
    (counts, location) => {
      counts.canPickupInStore.true += location.canPickupInStore ? 1 : 0;
      counts.canPickupInStore.false += location.canPickupInStore ? 0 : 1;
      counts.canReceiveFromStore.true += location.canReceiveFromStore ? 1 : 0;
      counts.canReceiveFromStore.false += location.canReceiveFromStore ? 0 : 1;
      counts.canShipToStore.true += location.canShipToStore ? 1 : 0;
      counts.canShipToStore.false += location.canShipToStore ? 0 : 1;
      counts.canShipToCustomer.true += location.canShipToCustomer ? 1 : 0;
      counts.canShipToCustomer.false += location.canShipToCustomer ? 0 : 1;
      counts.canShipToLocker.true += location.canShipToLocker ? 1 : 0;
      counts.canShipToLocker.false += location.canShipToLocker ? 0 : 1;
      counts.canReserveInStore.true += location.canReserveInStore ? 1 : 0;
      counts.canReserveInStore.false += location.canReserveInStore ? 0 : 1;
     return counts;
    },
    {
      canPickupInStore: { true: 0, false: 0 },
      canReceiveFromStore: { true: 0, false: 0 },
      canShipToStore: { true: 0, false: 0 },
      canShipToCustomer: { true: 0, false: 0 },
      canShipToLocker: { true: 0, false: 0 },
      canReserveInStore: { true: 0, false: 0 },
    }
  );

  const insertStockData = () => {
    setIsLoading(true);
    setShowAlert(true);
    const url = "http://localhost:3000/api/v1/mongoDbPostOmsLocations";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          setMessage("Dados inseridos com sucesso!");
          setIsLoading(false);
          setIsSave(true);
          setShowAlert(false);
        } else {
          setMessage("Erro ao inserir dados");
          setIsLoading(false);
          setShowAlert(false);
        }
      })
      .catch((error) => {
        setMessage("Erro ao inserir dados: " + error);
        console.log("ver1", error);
      });
  };
  
  return (
    <>
      <ChakraProvider>
        <Topbar title="Totais de Filiais" />
        <TopbarBelow />
        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          
          <FormLabel htmlFor="clientId">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">ClientId:</InputLeftAddon>
              <Select
                size="md"
                id="clientId"
                value={orderUser}
                onChange={(event) => setOrderUser(event.target.value)}
              >
                <option value="">Selecione um lojista</option>
                <option value="alpargatas">alpargatas</option>
                <option value="amc">amc</option>
                <option value="boticario">boticario</option>
                <option value="centauro">centauro</option>
                <option value="hering">hering</option>
                <option value="inbrands">inbrands</option>
                <option value="lamoda">lamoda</option>
                <option value="lebes">lebes</option>
                <option value="lepostiche">lepostiche</option>
                <option value="luizabarcelos">luizabarcelos</option>
                <option value="lunelli">lunelli</option>
                <option value="marisa">marisa</option>
                <option value="restoque">restoque</option>
                <option value="samsonite">samsonite</option>
                <option value="schumann">schumann</option>
                <option value="studiozcalcados">studiozcalcados</option>
                <option value="tokstok">tokstok</option>
                <option value="viaveneto">viaveneto</option>
                <option value="xiaomi">xiaomi</option>
                <option value="youcom">youcom</option>
                
                
              </Select>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Page</InputLeftAddon>
              <Input
                size="md"
                id="test1"
                value={stockPage}
                onChange={(event) => setStockPage(event.target.value)}
              ></Input>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Nome da Analise</InputLeftAddon>
              <Input
                size="md"
                id="test1"
                value={analysisName}
                onChange={(event) => setAnalysisName(event.target.value)}
              ></Input>
            </InputGroup>
          </FormLabel>
          <Button
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            colorScheme="purple"
            onClick={() => {
              apiCall();
            }}
          >
            Verificar{" "}
          </Button>
          <Button
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            colorScheme="purple"
            onClick={() => {
              insertStockData();
            }}
          >
            Inserir Analise{" "}
          </Button>

          <>
            <CSVLink
              data={csvData}
              headers={[
                "clientId",
                "Id",
                "nome",
                "pickup",
                "recebe de loja",
                "envia para loja",
                "envia para cliente",
                "envia para locker",
                "reserva",
                "ativa",
                "possui canais vinculados",
                "possui algum fluxo ativo",
              ]}
              separator={";"}
              filename={`filiais_${orderUser}_${dateFile}`}
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
            {showAlert ? (
              <Alert status="info">
                <AlertIcon />
                Aguarde enquanto os dados são salvos...
              </Alert>
            ) : null}
          </>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <ChakraProvider>
            <Text style={{ fontWeight: "bold" }}>
              Location Com Algum Fluxo Ativo + Canal Ativo:{" "}
              <span style={{ color: "blue" }}>{totalYes}</span>
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Location Com <span style={{ color: "red" }}>Nenhum</span> Fluxo
              Ativo ou Canal Inativo:{" "}
              <span style={{ color: "red" }}>{totalNo}</span>
            </Text>
            <span>*max de 500 registros por pag</span>
          </ChakraProvider>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}></div>

          <br />
          {isLoading ? <Progress size="xs" isIndeterminate /> : null}
        </div>
        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {isError && (
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              rounded="md"
              type="left-accent"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Algo de Errado!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Verifique se o clienteId está correto ou existe. O locationId
                não é validado, ou seja, se colocar algo que não existe ou
                errado, simplesmente não trará resutado.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </ChakraProvider>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ChakraProvider>
          <ChakraProvider>
            <Heading as="h1" size="md">
              Fluxos Ativos:
            </Heading>
            <Text>Pickup: {totalFlows.canPickupInStore.true}</Text>
            <Text>ShipTo Store (enviar): {totalFlows.canShipToStore.true}</Text>
            <Text>
              ShipTo Store (recebe): {totalFlows.canReceiveFromStore.true}
            </Text>
            <Text>Envio p/ Cliente: {totalFlows.canShipToCustomer.true}</Text>
            <Text>Envia p/locker: {totalFlows.canShipToLocker.true}</Text>
            <Text>Reservar: {totalFlows.canReserveInStore.true}</Text>
          </ChakraProvider>
          <Table variant="striped" colorScheme="purple" size="sm" maxW="700px">
            <TableCaption>Locations</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Filial</Th>
                <Th>Pickup</Th>
                <Th>ShipTo (Recebe)</Th>
                <Th>ShipTo (Envia)</Th>
                <Th>Envia P/Cliente</Th>
                <Th>Envia Locker</Th>
                <Th>Reserva</Th>
                <Th>Ativa</Th>
                <Th>Possui Vinculo a Canal</Th>
                <Th>Fluxo Ativo + Canal Ativo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {locations.map((locationView) => (
                <Tr key={locationView.id}>
                  <Td>{locationView.id}</Td>
                  <Td>{locationView.name}</Td>
                  <Td
                    style={{
                      color: locationView.canPickupInStore ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.canPickupInStore ? "V" : "X"}
                  </Td>
                  <Td
                    style={{
                      color: locationView.canReceiveFromStore ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.canReceiveFromStore ? "V" : "X"}
                  </Td>
                  <Td
                    style={{
                      color: locationView.canShipToStore ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.canShipToStore ? "V" : "X"}
                  </Td>

                  <Td
                    style={{
                      color: locationView.canShipToCustomer ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.canShipToCustomer ? "V" : "X"}
                  </Td>

                  <Td
                    style={{
                      color: locationView.canShipToLocker ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.canShipToLocker ? "V" : "X"}
                  </Td>
                  <Td
                    style={{
                      color: locationView.canReserveInStore ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.canReserveInStore ? "V" : "X"}
                  </Td>
                  <Td
                    style={{
                      color: locationView.enabled ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.enabled ? "V" : "X"}
                  </Td>
                  <Td
                    style={{
                      color: locationView.channels[0] ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {locationView.channels[0] ? "V" : "X"}
                  </Td>
                  <Td
                    style={{
                      color:
                        (locationView.canPickupInStore ||
                          locationView.canReceiveFromStore ||
                          locationView.canShipToStore ||
                          locationView.canShipToCustomer ||
                          locationView.canShipToLocker ||
                          locationView.canReserveInStore) &&
                        locationView.enabled &&
                        locationView.channels.length > 0 &&
                        locationView.channels[0]
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {(locationView.canPickupInStore ||
                      locationView.canReceiveFromStore ||
                      locationView.canShipToStore ||
                      locationView.canShipToCustomer ||
                      locationView.canShipToLocker ||
                      locationView.canReserveInStore) &&
                    locationView.enabled &&
                    locationView.channels.length > 0 &&
                    locationView.channels[0]
                      ? "SIM"
                      : "NÃO"}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ChakraProvider>
      </div>
    </>
  );
}
