import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
import WalkthroughPopover from "./infos/infosStockCommerce";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

import { useState } from "react";
import {
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  ChakraProvider,
  Progress,
  Select,
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, Alert, AlertIcon 
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";

export default function Stocks() {
  let [stock, setStock] = useState([]);
  let [stockUserOms, setStockUserOms] = useState("leposticheoms");
  let [stockUserCommerce, setStockUserCommerce] = useState("lepostiche");
  let [stockAvailability, setStockAvailability] = useState();
  let [stockChannel, setStockChannel] = useState("2");
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setError] = useState(null);
  let [message,setMessage] = useState();
  let [dateNow, setDatenow] = useState(new Date());
  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );
 
  let [isSave, setIsSave] = useState(false);
  let [showAlert, setShowAlert] = useState(false);


  const apiCall = async () => {
    setIsLoading(true);
    setDateFile(dateFile);
    try {
      const response = await fetch("getOmsSkusFromMapping", {
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
{/* <>
  // const dataToSend = {
  //   stockData: stock.map((item) => ({
  //     ProductID: item.ProductID,
  //     clientIdCommerce: stockUser,
  //     OutStockHandlingDays: item.OutStockHandlingDays,
  //     totalQuantity: item.StockOnHand,
  //     StockBalance: item.StockBalance,
  //     updatedAt: item.LastUpdate,
  //     enabled: item.StockOnHand,
  //     StockReserved: item.StockReserved,
  //     WarehouseID: item.WarehouseID,
  //     WarehouseName: item.WarehouseName,
  //     availability: item.availability,
  //     createdDate: dateNow,
  //     viewName: stockVerication,
  //   })),
  // }

  // const insertStockData = () => {
  //   setIsLoading(true);
  //   setShowAlert(true);
  //   //const url = "http://localhost:3000/api/v1/postStockFromCommerce";
  //   const url = "https://omni-tools-chakra.vercel.app/api/v1/postStockFromCommerce"
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataToSend),
  //   };
      
  //   fetch(url, options)
  //     .then((response) => {
  //       if (response.ok) {
  //         setMessage("Dados inseridos com sucesso!");
  //         setIsLoading(false);
  //         setIsSave(true);
  //         setShowAlert(false);
  //       } else {
  //         setMessage("Erro ao inserir dados");
  //         setIsLoading(false);

  //       }
  //     })
  //     .catch((error) => {
  //       setMessage("Erro ao inserir dados: " + error);
  //       console.log("ver1",error)
  //     });
  // };

  // const Clean = () => {
  //   setMessage(null);
  //   setIsSave(false);
  //   setStockChannel(stockChannel);
  //   setStockUser(stockUser);
  //   setStockVerification("Coloque_um_nome_sem_espacos_dps_clique_em_inserir_dados");
  //   setStock([]);
  //   setDateFile(format(new Date(), "dd_MM_yyyy_HH_mm_ss"));
  //   setIsSave(false);
  //   setShowAlert(false);
  // }
  </> */}
return (
    <>
      <ChakraProvider>
      <Topbar title="Ferramenta de Depara dos SKUS" />
      <TopbarBelow />
        <br />
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">ClientId OMS</InputLeftAddon>
              <Input
                size="md"
                id="test1"
                value={stockUserOms}
                onChange={(event) => setStockUserOms(event.target.value)}
              ></Input>
            </InputGroup>
          </FormLabel>
          <FormLabel type="text">
            <InputGroup size="md" mb={5}>
              <InputLeftAddon size="md">TenantID Commerce</InputLeftAddon>
              <Input
                size="md"
                id="test1"
                value={stockUserCommerce}
                onChange={(event) => setStockUserCommerce(event.target.value)}
              ></Input>
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
            onClick={() =>{apiCall()}}
          >
            Passo 1{" "}
          </Button>
     {showAlert ?<Alert status='info'>
    <AlertIcon />
    Aguarde enquanto os dados são salvos...
  </Alert>
: null}
        {isSave ? 
        <Alert status='success'>
          <AlertIcon />
          Analise Salva no banco com Sucesso!
          {message}
              </Alert>
        : null}
          
          <br />
          {isLoading ? <Progress size="xs" isIndeterminate /> : null}
       
        </div>

        <br />
        <div style={{ maxWidth: "100%" }}>
          <div
            className={styles.grid}
            style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Table variant='striped' colorScheme='purple' size='sm' maxW='600px'>
  <TableCaption>Estoque</TableCaption>
  <Thead>
    <Tr>
      <Th>Warehouse</Th>
      <Th>Product ID</Th>
      <Th>Stock Balance</Th>
      <Th>Availability</Th>
    </Tr>
  </Thead>
  <Tbody>
    {stock.map((stockView) => (
      <Tr key={stockView.ProductID}>
        <Td>{stockView.WarehouseName}</Td>
        <Td>{stockView.ProductID}</Td>
        <Td>{stockView.StockBalance}</Td>
        <Td>{stockView.availability === "I" ? "Habilitado" : "Desabilitado"}</Td>
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

