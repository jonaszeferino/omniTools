/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useState, useEffect } from "react";
import React from "react";
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
  
  InputGroup,
  InputLeftAddon,
  ChakraProvider,
  Progress,
  
  Table, Thead, Tbody, Tr, Th, Td, TableCaption , Badge, Stack, Select
} from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";


export default function orders() {
  let [orderUser, setOrderUser] = useState();
  let [isError, setError] = useState(null);
  let [totalResults, setTotalResults] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );
  let [locations,setLocations] = useState([])


  const apiCall = async () => {
    setIsLoading(true);
     try {
      const response = await fetch("/api/v1/getOmsLocations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: orderUser,
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
  console.log(locations)

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
              <Input
                size="md"
                id="clientId"
                value={orderUser}
                onChange={(event) => setOrderUser(event.target.value)}
                ></Input>
            </InputGroup>
            </FormLabel>

            <Button
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            colorScheme="purple"
            onClick={() =>{apiCall()}}
          >
            Verificar{" "}
          </Button>
    
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
 
          </div>

       
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
      <Table variant='striped' colorScheme='purple' size='sm' maxW='700px'>
  <TableCaption>Locations</TableCaption>
  <Thead>
    <Tr>
      <Th>Filial</Th>
      <Th>ID</Th>
      <Th>Pickup</Th>
      <Th>ShipTo(Recebe)</Th>
      <Th>ShipTo(Envia)</Th>
      <Th>Envia</Th>
      <Th>Envia Locker</Th>
      <Th>Reserva</Th>
      <Th>Ativa</Th>
      <Th>Possui Canal</Th>
      
    </Tr>
  </Thead>
  <Tbody>
  {locations.map((locationView) => (
      <Tr key={locationView.id}>
        <Td>{locationView.id}</Td>
        <Td>{locationView.name}</Td>
        <Td style={{color: locationView.canPickupInStore ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.canPickupInStore ? 'V' : 'X'}
        </Td>
        <Td style={{color: locationView.canReceiveFromStore ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.canReceiveFromStore ? 'V' : 'X'}
        </Td>
        <Td style={{color: locationView.canShipToStore ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.canShipToStore ? 'V' : 'X'}
        </Td>
        <Td style={{color: locationView.canShipToCustomer ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.canShipToCustomer ? 'V' : 'X'}
        </Td>
        <Td style={{color: locationView.canShipToLocker ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.canShipToCustomer ? 'V' : 'X'}
        </Td>
        <Td style={{color: locationView.canShipToLocker ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.canReserveInStore ? 'V' : 'X'}
        </Td>
        <Td style={{color: locationView.enabled ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.enabled ? 'V' : 'X'}
        </Td>
        <Td style={{color: locationView.channels[0] ? 'green' : 'red', fontWeight: 'bold'}}>
          {locationView.channels[0] ? 'V' : 'X'}
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

