/* eslint-disable react/no-children-prop */
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";


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
import { CSVLink } from "react-csv";

export default function Reservations() {
  let [reservationStock, setReservationStock] = useState([]);
  let [reservationUser, setReservationUser] = useState();
  let [reservationBasic, setReservationBasic] = useState();
  let [messageError, setMessageError] = useState();
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [isCopied, setIsCopied] = useState(false);

  const [clickedOrderId, setClickedOrderId] = useState(null);

  const apiCall = (event) => {
    const url = `https://hub.omniplat.io/v1/clients/${reservationUser}/reservations/unfinished?pageSize=100`;
    let authorizationValue;
    setIsLoading(true);

    switch (reservationUser) {
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

    fetch(url, {
      headers: new Headers({
        Authorization: authorizationValue,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        setError(false);
        if (response.status === 200) {
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error("Dados Incorretos");
        }
      })
      .then((result) => setReservationStock(result))
      .catch((error) => {
        setError(true);

        console.log("teste" + error.message);
        setMessageError("Ocorreu um erro ao buscar as reservas.");
        setReservationStock([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("reservationStock: ", reservationStock);

  const data = reservationStock.map((reserve) => [
    format(new Date(reserve.createdAt), "dd/MM/yyyy HH:mm:ss"),
    reserve.clientId.replace(/"/g, ""),
    reserve.channelId.replace(/"/g, ""),
    reserve.locationId.replace(/"/g, ""),
    reserve.skuId.replace(/"/g, ""),
    reserve.orderId.replace(/"/g, ""),
    reserve.quantity.toString().replace(/"/g, ""),
    differenceInDays(new Date(), new Date(reserve.createdAt)),
  ]);

  console.log("csvOK:", data);

  const currentDate = new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = currentDate
    .toLocaleString("pt-BR", options)
    .replace(/\//g, " ");
  const dateFile = formattedDate.replace(/[/: ]/g, "_");

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

  function handleCopyClick(orderId) {
    setClickedOrderId(orderId);
  }

  return (
    <>
      <ChakraProvider>
      <Topbar title="Reservas Não finalizadas " />
      <TopbarBelow />

        <br />

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">ClientId:</InputLeftAddon>
              <Input
                size="md"
                value={reservationUser}
                onChange={(event) => setReservationUser(event.target.value)}
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

          {data.length > 0 ? (
            <CSVLink
              data={data}
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
              filename={`reservas_pendentes_${reservationUser}_${dateFile}`}
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
                Verifique se o clienteId está correto ou existe
              </AlertDescription>
            </Alert>
          )}
        </div>
        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {isLoading ? <Progress size="xs" isIndeterminate /> : null}
        </div>
      </ChakraProvider>

      <br />

      <div style={{ maxWidth: "100%" }}>
        {/* {isError === true ? (
          <ErrorPage message={`~ Confira o Texto ~ ${messageError} `}>
            {" "}
          </ErrorPage>
        ) : ( */}
        <div
          className={styles.grid}
          style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
        >
          {reservationStock.map((reserve) => {
            const isOutdated =
              differenceInDays(new Date(), new Date(reserve.createdAt)) > 10;
            return (
              <div className={styles.card} key={reserve.id}>
                <span>Pedido: {reserve.orderId}</span>{" "}
                <ChakraProvider>
                  <Button onClick={() => copyToClipboard(reserve.orderId)}>
                    Copiar
                  </Button>
                </ChakraProvider>
                <br />
                <span>Cliente: {reserve.clientId}</span> <br />
                <span>Canal: {reserve.channelId}</span> <br />
                <span>Location: {reserve.locationId}</span> <br />
                <span>Sku: {reserve.skuId}</span> <br />
                <span>Quantidade: {reserve.quantity}</span> <br />
                <span>
                  Data:{" "}
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
                    {`Reserva parada a ${differenceInDays(
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
      </div>
    </>
  );
}
