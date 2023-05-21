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
  let [isLoading, setIsLoading] = useState(false);
  let [orderChannel, setOrderChannel] =  useState([]);
  let [channel, setChannel] =  useState("");
  let [orderStatus, setOrderStatus] =  useState("")
  let [orderOrderId, setOrderId] =  useState("")
  let [orderFulfillmentId, setOrderFulfillmentId] =  useState("F1")
 
  const [showAlert, setShowAlert] = useState(false);
   

  const apiCall = async () => {
    setShowAlert(false);
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/putOmsOrderStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: orderUser, 
          channel: orderChannel, 
          status: orderStatus, 
          orderId: orderOrderId, 
          fulfillmentId: orderFulfillmentId
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

  const apiCallChannels = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/getOmsChannelsHLG", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: orderUser,
        }),
      });
      const data = await response.json();
      setOrderChannel(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(orderUser), 
  console.log(channel), 
  console.log(orderStatus), 
  console.log(orderOrderId), 
  console.log(orderFulfillmentId)
 
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
                onBlur={apiCallChannels}
              >
                <option value="">Selecione um lojista</option>
                <option value="bemol">bemol</option>
                {/* <option value="alpargatas">alpargatas</option>
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
                <option value="youcom">youcom</option> */}
                
                
              </Select>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Canal</InputLeftAddon>
              <Select
                size="md"
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                >
                {orderChannel.map((item, index) => (
                  <option key={index} value={item.channelId}>
                    {item.channelId}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormLabel>



          <FormLabel htmlFor="clientId">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">Status:</InputLeftAddon>
              <Select
                size="md"
                id="orderStatus"
                value={orderStatus}
                onChange={(event) => setOrderStatus(event.target.value)}
              >
                <option value="">Selecione um Status</option>
                <option value="WILDCARD">WILDCARD</option>
                <option value="BILLED">BILLED</option>
                <option value="SEND_READY">SEND_READY</option>
            </Select>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">OrderID</InputLeftAddon>
              <Input
                size="md"
                value={orderOrderId}
                onChange={(event) => setOrderId(event.target.value)}
                
              ></Input>
            </InputGroup>
          </FormLabel>

          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">FulfillmentID</InputLeftAddon>
              <Input
                size="md"
                value={orderFulfillmentId}
                onChange={(event) => setOrderFulfillmentId(event.target.value)}
                
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
       

          <>
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
              
            </Heading>
            
          </ChakraProvider>
          <Table variant="striped" colorScheme="purple" size="sm" maxW="700px">
            <TableCaption></TableCaption>
              <Tbody>
              
            </Tbody>
          </Table>
        </ChakraProvider>
      </div>
    </>
  );
}
