/* eslint-disable react/no-children-prop */
import { useState } from "react";
import styles from "../styles/Home.module.css";

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

export default function stocks() {
  let [stock, setStock] = useState([]);
  let [stockUser, setStockUser] = useState();
  let [stockChannel, setStockChannel] = useState();
  let [stockLocation, setStockLocation] = useState();
  let [stockBasic, setStockBasic] = useState();
  let [messageError, setMessageError] = useState();
  let [isError, setError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [isCopied, setIsCopied] = useState(false);

  const [clickedOrderId, setClickedOrderId] = useState(null);

  const apiCall = (event) => {
    const url = `https://production-inventory.omniplat.io/v1/clients/${stockUser}/stocks?&channelId=${stockChannel}&stock&locationId=${stockLocation}&page=1&perpage=500`;

    let authorizationValue;
    setIsLoading(true);
    console.log("aqui", url);

    switch (stockUser) {
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
      .then((result) => setStock(result))
      .catch((error) => {
        setError(true);
        console.log("aqui", error);

        console.log("aqui", error.message);
        setMessageError("Ocorreu um erro ao buscar os estoques.");
        setStock([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("aqui: ", stock);
  console.log("aqui", isError);

  // const data = stock.map((stockView) => [
  //   format(new Date(stockView.createdAt), "dd/MM/yyyy HH:mm:ss"),
  //   stockView.clientId.replace(/"/g, ""),
  //   stockView.channelId.replace(/"/g, ""),
  //   stockView.locationId.replace(/"/g, ""),
  //   stockView.skuId.replace(/"/g, ""),
  //   stockView.orderId.replace(/"/g, ""),
  //   stockView.quantity.toString().replace(/"/g, ""),
  //   differenceInDays(new Date(), new Date(stockView.createdAt)),
  // ]);

  // console.log("csvOK:", data);

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

          {/* {data.length > 0 ? (
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
              filename={`reservas_pendentes_${stockUser}_${dateFile}`}
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
          ) : null} */}
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
        <div
          className={styles.grid}
          style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
        >
          {stock.map((stockView) => {
            const isOutdated =
              differenceInDays(new Date(), new Date(stockView.updatedAt)) > 10;
            return (
              <div className={styles.card} key={stockView.id}>
                <span>Pedido: {stockView.orderId}</span>{" "}
                <ChakraProvider>
                  <Button onClick={() => copyToClipboard(stockView.orderId)}>
                    Copiar
                  </Button>
                </ChakraProvider>
                <br />
                <span>Cliente: {stockView.clientId}</span> <br />
                <span>Location: {stockView.locationId}</span> <br />
                <span>Sku: {stockView.skuId}</span> <br />
                <span>Quantidade: {stockView.balance}</span> <br />
                <span>
                  Data:{" "}
                  {format(new Date(stockView.updatedAt), "dd/MM/yyyy HH:mm:ss")}
                </span>
                <br />
                <span>
                  Dias Nesse Status:{" "}
                  <strong>
                    {" "}
                    {differenceInDays(
                      new Date(),
                      new Date(stockView.updatedAt)
                    )}
                  </strong>
                </span>
                {"  "}-
                {isOutdated && (
                  <span style={{ color: "red", font: "bold" }}>
                    {`Reserva parada a ${differenceInDays(
                      new Date(),
                      new Date(stockView.updatedAt)
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
