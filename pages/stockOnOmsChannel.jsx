import styles from "../styles/Home.module.css";
import { format } from "date-fns";
import WalkthroughPopover from "./infos/infosStockCommerce";
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
  
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";

export default function Stocks() {
  let [stock, setStock] = useState([]);
  let [stockUser, setStockUser] = useState("lepostiche");
  let [stockChannel, setStockChannel] = useState("site");
  let [stockVerication, setStockVerification] = useState("Coloque_um_nome_sem_espacos_dps_clique_em_inserir_dados");
  let [isLoading, setIsLoading] = useState(false);
  let [message, setMessage] = useState(false);
  let [isError, setError] = useState(null);
  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );
    const apiCall = async () => {
    setIsLoading(true);
    setDateFile(dateFile);
    try {
      const response = await fetch("/api/v1/getStockFromChannelOms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

  const csvData = stock.map((stockCsv) => [
    stockCsv.clientId,
    stockCsv.locationId,
    stockCsv.skuId,
    stockCsv.totalQuantity,
    stockCsv.balance
  ]);

  //stockDataInsert

  const dataToSend = {
    stockData: stock.map(item => ({
      clientId_oms: item.clientId,
      locationId: item.locationId,
      stockType: item.stockType,
      totalQuantity: item.totalQuantity,
      balance: item.balance,
      updatedAt: item.updatedAt,
      enabled: item.enabled,
      view_id: "item.view_id",
      view_name: stockVerication,
      sku_id: item.skuId     
     

    }))
  };
 const insertStockData = () => {
    setIsLoading(true);
    const url = "http://localhost:3000/api/v1/postStockFromOms";
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
        } else {
          setMessage("Erro ao inserir dados");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setMessage("Erro ao inserir dados: " + error);
        console.log("ver1",error)
      });
  };
  return (
    <>
      <ChakraProvider>
        <Heading as="h1" size="xl" textAlign="center">
          Estoque por Canal - OMS 
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
          {csvData.length > 0 ? (
            <>
                  <Button
            margin={2}
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            my={4}
            ml={4}
            colorScheme="purple"
            onClick={() => insertStockData(dataToSend)}
          >
            Inserir Dados{" "}
          </Button>
          <FormLabel type="text">
          <InputGroup size="md" mb={5}>
            <InputLeftAddon size="md">Analise</InputLeftAddon>
            <Input
              size="md"
              id="test1"
              value={stockVerication}
              onChange={(event) => setStockVerification(event.target.value)}
            ></Input>
          </InputGroup>
        </FormLabel>
        </>
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

              <div className={styles.card} key={stockView.skuId}>
                <span>Cliente: {stockView.clientId}</span> <br />
                <span>Tipo: {stockView.stockType}</span> <br />
                <span>Total: {stockView.totalQuantity}</span> <br />
                <span>Balanço: {stockView.balance}</span> <br />
                <span>Data: {stockView.updatedAt}</span> <br />
                <span>Ativo: {stockView.enabled}</span> <br />
                <span>Sku: {stockView.skuId}</span> <br />
               

 
               
                <br />
              </div>
            ))}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}
