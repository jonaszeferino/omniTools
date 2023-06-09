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
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,Select
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

export default function Stocks() {
  let [stock, setStock] = useState([]);
  let [stockUser, setStockUser] = useState("lepostiche");
  let [stockChannel, setStockChannel] = useState("site");
  let [stockPage, setStockPage] = useState("1");
  let [stockVerication, setStockVerification] = useState(
    "Coloque_um_nome_sem_espacos_dps_clique_em_inserir_dados"
  );
  let [isLoading, setIsLoading] = useState(false);
  let [isSave, setIsSave] = useState(false);
  let [message, setMessage] = useState(false);
  let [isError, setError] = useState(null);
  let [dateNow, setDatenow] = useState(new Date());

  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );
  let [channels, setChannels] = useState([])
 
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
          page: stockPage
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
    stockCsv.balance,
  ]);

  //stockDataInsert

  const dataToSend = {
    stockData: stock.map((item) => ({
      clientIdOms: item.clientId,
      locationId: item.locationId,
      stockType: item.stockType,
      totalQuantity: item.totalQuantity,
      balance: item.availableQuantity,
      updatedAt: item.updatedAt,
      enabled: item.enabled,
      viewId: "item.view_id",
      viewName: stockVerication,
      skuId: item.skuId,
      createdDate: dateNow,
    })),
  };

  // no oms inves do stockbalance pegamos o availableQuantity pois é desse valor que o commerce pega as infos por canal
  
  const insertStockData = () => {
    setIsLoading(true);
    //const url = "http://localhost:3000/api/v1/postStockFromOms";
    const url = "http://localhost:3000/api/v1/mongoDbPostOmsStock";
    //const url = "https://omni-tools-chakra.vercel.app/api/v1/postStockFromOms";
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
        } else {
          setMessage("Erro ao inserir dados");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setMessage("Erro ao inserir dados: " + error);
        console.log("ver1", error);
      });
  };

  const Clean = () => {
    setMessage(null);
    setIsSave(false);
    setStockChannel(stockChannel);
    setStockUser(stockUser);
    setStockVerification(
      "Coloque_um_nome_sem_espacos_dps_clique_em_inserir_dados"
    );
    setStock([]);
    setDateFile(format(new Date(), "dd_MM_yyyy_HH_mm_ss"));
    setIsSave(false);
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

  return (
    <>
      <ChakraProvider>
        <Topbar title="Estoque por Canal - OMS " />
        <TopbarBelow />

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
              <InputLeftAddon size="md">Page</InputLeftAddon>
              <Input
                size="md"
                id="test1"
                value={stockPage}
                onChange={(event) => setStockPage(event.target.value)}
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
            onClick={() => {
              Clean(), apiCall();
            }}
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
                onClick={() => {
                  setIsSave(false), insertStockData(dataToSend);
                }}
              >
                Inserir Dados{" "}
              </Button>
              <FormLabel type="text">
                <InputGroup size="md" mb={5}>
                  <InputLeftAddon size="md">Analise</InputLeftAddon>
                  <Input
                    maxLength={55}
                    size="md"
                    id="test1"
                    value={stockVerication}
                    onChange={(event) =>
                      setStockVerification(event.target.value)
                    }
                  ></Input>
                </InputGroup>
              </FormLabel>

              {isLoading ? (
                <Alert status="info">
                  <AlertIcon />
                  Aguarde enquanto os dados são salvos...
                </Alert>
              ) : null}
              {isSave ? (
                <Alert status="success">
                  <AlertIcon />
                  Analise Salva no banco com Sucesso!
                  {message}
                </Alert>
              ) : null}
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
            <Table
              variant="striped"
              colorScheme="purple"
              size="sm"
              maxW="500px"
            >
              <TableCaption>Resultados de estoque</TableCaption>
              <Thead>
                <Tr>
                  <Th>Cliente</Th>
                  <Th>Tipo</Th>
                  <Th>Total</Th>
                  <Th>Balanço</Th>
                  <Th>Data</Th>

                  <Th>Sku</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stock.map((stockView) => (
                  <Tr key={stockView.skuId}>
                    <Td>{stockView.clientId}</Td>
                    <Td>{stockView.stockType}</Td>
                    <Td>{stockView.totalQuantity}</Td>
                    <Td>{stockView.balance}</Td>
                    <Td>{stockView.updatedAt}</Td>

                    <Td>{stockView.skuId}</Td>
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