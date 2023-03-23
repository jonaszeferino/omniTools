/* eslint-disable react-hooks/rules-of-hooks */

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useState, useEffect } from "react";
import React from "react";
import ErrorPage from "./error-page";
import styles from "../styles/Home.module.css";
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
  Heading,
  InputGroup,
  InputLeftAddon,
  ChakraProvider,
  Progress,
} from "@chakra-ui/react";

export default function orders() {
  let [orderStock, setOrderStock] = useState([]);
  let [orderUser, setOrderUser] = useState();
  let [orderLocation, setOrderLocationId] = useState();
  let [isError, setError] = useState(null);
  let [totalResults, setTotalResults] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );

  const apiCall = (event) => {
    setIsLoading(true);
    setOrderStock(
      []
    ); /*coloquei isso pq tava ficando sujeira quando mudava o lojista*/
    console.log(isLoading, "Verificar0 " + new Date());
    const url = `https://production-order.omniplat.io/v1/clients/${orderUser}/fulfillments/locations/${orderLocation}/status/WAITING?pageSize=100`;

    const urlString = `https://production-order.omniplat.io/v1/clients/${orderUser}/locations`;

    let authorizationValue;

    switch (orderUser) {
      case "lepostiche":
        authorizationValue = process.env.NEXT_PUBLIC_LEPOSTICHE;

        break;
      case "lebes":
        authorizationValue = process.env.NEXT_PUBLIC_LEBES;

        break;
      case "viaveneto":
        authorizationValue = process.env.NEXT_PUBLIC_VIA;

        break;
      case "vago":
        authorizationValue = process.env.NEXT_PUBLIC_LEBES;

        break;
      default:
        authorizationValue = process.env.NEXT_PUBLIC_LEBES;
    }
    console.log("verificara URL:" + url);
    fetch(url, {
      headers: new Headers({
        Authorization: authorizationValue,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setError(false);

          return response.json();
        } else {
          setIsLoading(false);
          throw new Error("Dados Incorretos");
        }
      })
      .then(
        (result) => (
          console.log("result: " + result),
          setIsLoading(false),
          console.log(isLoading, "Verificar4 " + new Date()),
          setOrderStock(result.data),
          setTotalResults(result.total)
        )
      )
      .catch((error) => setError(true));
  };
  console.log("ordeStock:" + orderStock);
  console.log("ordeStockData:" + orderStock.data);

  const csvData = orderStock.map((orders) => [
    orders.clientId,
    orders.orderId,
    orders.locationId,
    orders.channelId,

    orders.createdAt
      ? format(new Date(orders.createdAt), "dd/MM/yyyy HH:mm:ss")
      : "",
    differenceInDays(new Date(), new Date(orders.createdAt)),
  ]);

  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        console.log("Copied to clipboard:", text);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  useEffect(() => {
    console.log("isLoading alterado:", isLoading);
  }, [isLoading]);

  // graphics

  const DAYS_5 = 5;
  const DAYS_10 = 10;
  const DAYS_20 = 20;
  const DAYS_30 = 30;
  const DAYS_60 = 60;

  const orderStockLength = orderStock.length;

  const graphicData = orderStock.map((orders) => {
    const createdAt = orders.createdAt
      ? format(new Date(orders.createdAt), "dd/MM/yyyy HH:mm:ss")
      : "";

    const daysSinceCreation = differenceInDays(
      new Date(),
      new Date(orders.createdAt)
    );
    const isGreaterThan5Days = daysSinceCreation > DAYS_5;
    const isGreaterThan10Days = daysSinceCreation > DAYS_10;
    const isGreaterThan20Days = daysSinceCreation > DAYS_20;
    const isGreaterThan30Days = daysSinceCreation > DAYS_30;
    const isGreaterThan60Days = daysSinceCreation > DAYS_60;

    return [
      createdAt,

      isGreaterThan5Days,
      isGreaterThan10Days,
      isGreaterThan20Days,
      isGreaterThan30Days,
      isGreaterThan60Days,
    ];
  });

  const between5And10DaysData = graphicData.filter(
    (data) => data[1] && !data[2]
  ).length;
  const between11And20DaysData = graphicData.filter(
    (data) => data[2] && !data[3]
  ).length;
  const between21And30DaysData = graphicData.filter(
    (data) => data[3] && !data[4]
  ).length;
  const between31And60DaysData = graphicData.filter(
    (data) => data[4] && !data[5]
  ).length;
  const greaterThan60DaysData = graphicData.filter((data) => data[5]).length;

  return (
    <>
      <ChakraProvider>
        <Heading as="h1" size="xl" textAlign="center">
          Pedidos Waiting
        </Heading>
        <Heading as="h3" size="xs" textAlign="center">
          **com alerta para os parados a mais de 5 dias**
        </Heading>

        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FormLabel htmlFor="clientId">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">ClientId:</InputLeftAddon>
              <Input
                size="md"
                id="clientId"
                value={orderUser}
                onChange={(event) => setOrderUser(event.target.value)}
              ></Input>
              <InputLeftAddon size="md">LocationID:</InputLeftAddon>

              <Input
                size="md"
                value={orderLocation}
                onChange={(event) => setOrderLocationId(event.target.value)}
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

          {csvData.length > 0 ? (
            <CSVLink
              data={csvData}
              headers={[
                "Cliente",
                "Pedido",
                "Filial",
                "Canal",
                "Data",
                "DiasParado",
              ]}
              separator={";"}
              filename={`pedidos_pendentes_${orderUser}_${dateFile}`}
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
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            {csvData.length > 0 ? (
              <VictoryChart theme={VictoryTheme.vintage}>
                <VictoryAxis />
                <VictoryAxis
                  dependentAxis
                  style={{
                    tickLabels: {
                      fill: "black",
                      fontSize: 8,
                    },
                  }}
                />
                <VictoryBar
                  style={{ data: { fill: "tomato", width: 25 } }}
                  data={[
                    { x: "> 5 dias", y: between5And10DaysData },
                    { x: "> 10 dias", y: between11And20DaysData },
                    { x: "> 20 dias", y: between21And30DaysData },
                    { x: "> 30 dias", y: between31And60DaysData },
                    { x: "> 60 dias", y: greaterThan60DaysData },
                  ]}
                  x="x"
                  y="y"
                />
              </VictoryChart>
            ) : null}
          </div>

          {csvData.length > 0 ? (
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <h1>Pedidos no Status Waiting - "Em Espera" </h1>
              <span>
                Total de Registros em Espera:
                <strong> {orderStockLength}</strong>{" "}
              </span>
              <br />
              <span>
                Menos de 5 dias {" OK "}:
                <strong>
                  {" "}
                  {orderStockLength -
                    between5And10DaysData -
                    between11And20DaysData -
                    between21And30DaysData -
                    between31And60DaysData -
                    greaterThan60DaysData}
                </strong>
              </span>
              <br />

              <span>
                De 5 a 10 dias: <strong> {between5And10DaysData}</strong>
              </span>
              <br />
              <span>
                De 11 a 20 dias: <strong> {between11And20DaysData}</strong>
              </span>
              <br />
              <span>
                De 21 a 30 dias:<strong> {between21And30DaysData}</strong>
              </span>
              <br />
              <span>
                De 31 a 60 dias:<strong> {between31And60DaysData}</strong>
              </span>
              <br />
              <span>
                Mais de 61 dias: <strong> {greaterThan60DaysData}</strong>
              </span>
              <br />
            </div>
          ) : null}
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

      <div className={styles.grid}>
        {orderStock.map((reserve) => {
          const isOutdated =
            differenceInDays(new Date(), new Date(reserve.createdAt)) > 5;
          return (
            <div className={styles.card} key={reserve.orderId}>
              <span>Pedido: {reserve.orderId}</span>{" "}
              <ChakraProvider>
                <Button onClick={() => copyToClipboard(reserve.orderId)}>
                  Copiar
                </Button>
              </ChakraProvider>
              <br />
              <span>ClientId: {reserve.clientId}</span> <br />
              <span>Canal: {reserve.channelId}</span> <br />
              <span>Location: {reserve.locationId}</span> <br />
              <span>
                Data do Pedido:{" "}
                {format(new Date(reserve.createdAt), "dd/MM/yyyy HH:mm:ss")}
              </span>
              <br />
              <span>
                Dias Nesse Status:{" "}
                <strong>
                  {" "}
                  {differenceInDays(new Date(), new Date(reserve.createdAt))}
                </strong>
              </span>
              {"  "}-
              {isOutdated && (
                <span style={{ color: "red", font: "bold" }}>
                  {`Pedido nesse status ${differenceInDays(
                    new Date(),
                    new Date(reserve.createdAt)
                  )} dias`}
                </span>
              )}
              <br />
            </div>
          );
        })}
      </div>
      {/* )} */}
    </>
  );
}
