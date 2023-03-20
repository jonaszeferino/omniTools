/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import React from "react";
import ErrorPage from "./error-page";
import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
import { CSVLink } from "react-csv";
import {
  Button,
  Text,
  FormLabel,
  Input,
  Heading,
  InputGroup,
  InputLeftAddon,
  ChakraProvider,
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
    const url = `https://production-order.omniplat.io/v1/clients/${orderUser}/fulfillments/locations/${orderLocation}/status/WAITING?pageSize=50`;
    let authorizationValue;
    setIsLoading(true);

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
          throw new Error("Dados Incorretos");
        }
      })
      .then(
        (result) => (
          console.log("result: " + result),
          setIsLoading(false),
          setOrderStock(result.data),
          setIsLoading(false),
          setTotalResults(result.total)
        )
      )
      .catch((error) => setError(true), setIsLoading(false));
  };
  console.log("ordeStock:" + orderStock);
  console.log("ordeStockData:" + orderStock.data);
  const csvData = orderStock.map((orders) => [
    orders.orderId,
    orders.locationId,
    orders.channelId,
    orders.createdAt
      ? format(new Date(orders.createdAt), "dd/MM/yyyy HH:mm:ss")
      : "",
    differenceInDays(new Date(), new Date(orders.createdAt)),
  ]);

  console.log("csv:", csvData);

  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        console.log("Copied to clipboard:", text);
        setIsCopied(true);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

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
                "DataPedido",
                "Cliente",
                "Chanal",
                "Filial",
                "Sku",
                "Pedido",
                "Quantidade",
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
        </div>

        <span>{isLoading ? <div>Carregando...</div> : " "}</span>
      </ChakraProvider>
      {isError === true ? (
        <ErrorPage message={`Verifique a grafia`}></ErrorPage>
      ) : (
        <div className={styles.grid}>
          {orderStock.map((reserve) => {
            const isOutdated =
              differenceInDays(new Date(), new Date(reserve.createdAt)) > 5;
            return (
              <div className={styles.card} key={reserve.orderId}>
                <span>Pedido: {reserve.orderId}</span>
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
      )}
    </>
  );
}
