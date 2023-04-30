import styles from "../styles/Home.module.css";
import WalkthroughPopover from "./infos/infosSkusMapping";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";
import { useState } from "react";
import {
  Button,
  Input,
  ChakraProvider,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  InputGroup,
  InputLeftElement,
  Heading,
  Icon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { parse } from "csv-parse";


export default function Stocks() {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSave, setIsSave] = useState(false);
  const [progress, setProgress] = useState(0);
  const [csvImport, setCsvImport] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadstart = () => {
      setIsLoading(true);
      setCsvImport(true);
    };
    reader.onload = () => {
      
      const fileContent = reader.result;
      console.log("import:", fileContent);
      parse(fileContent, { delimiter: ",", from_line: 2 }, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          
          setCsvData(data);
          console.log(data); // imprime os dados do CSV armazenados no estado csvData
        }
        setIsLoading(false);
      });
    };

    reader.readAsText(file, "UTF-8");
  };

  const dataToSend = {
    dataToSend: csvData.map((row, index) => {
      return {
        productId: row[0],
        integrationId: row[1],
        name: row[2],
        sku: row[3],
        ean: row[4],
        clientId: row[5],
      };
    }),
  };

  // onde será inserido os dados dos skus vindos do excell
  const insertStockData = () => {
    setIsLoading(true);
    const url = "http://localhost:3000/api/v1/postSkusFromCommerce";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };
    console.log(JSON.stringify(dataToSend));

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

    const totalItems = dataToSend.dataToSend.length;
    let itemsInserted = 0;
    const interval = setInterval(() => {
      itemsInserted++;
      const progressValue = itemsInserted / totalItems;
      setProgress(progressValue);

      // Verifica se todos os itens foram inseridos
      if (itemsInserted === totalItems) {
        clearInterval(interval);
        setProgress(1);
      }
    }, 500);
  };

  // const Clean = () => {
  //   setMessage(null);
  //   setIsSave(false);
  //   setCsvData([]);
  //   setIsSave(false);
  //   setShowAlert(false);
  // }

  return (
    <>
      <ChakraProvider>
        <Topbar title="Importação dos SKUs do Commerce para Depara" />
        <TopbarBelow />
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          <br />
          <br />
          <Heading as="h1" size="m" textAlign="center">
            Insira o Arquivo CSV para fazer o depara dos SKUs Commerce / OMS
          </Heading>
          <br />
          <WalkthroughPopover />
          <InputGroup>
            <InputLeftElement pointerEvents="none" />
            <label>
              <Button as="span" colorScheme="purple">
                <Icon as={DownloadIcon} mr="2" />
                Selecionar arquivo
              </Button>
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                display="none"
              />
            </label>
          </InputGroup>

          {isLoading ? <Progress size="xs" isIndeterminate /> : null}

          {csvImport ? (
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
              Salvar Depara no BD{" "}
            </Button>
          ) : null}
          
          {progress > 0 && progress < 1 && (
            <Progress size="xs" value={progress} />
          )}
          {isLoading ? (
            <Alert status="info">
              <AlertIcon />
              Aguarde enquanto os dados são salvos...
            </Alert>
          ) : null}
          {isSave ? (
            <Alert status="success">
              <AlertIcon />
              Analise Salva no banco com Sucesso!{" "}
              {message}
            </Alert>
          ) : null}

          <div>
            {csvData.length > 0 ? (
              <Table variant="striped" colorScheme="gray">
                <TableCaption>Estoque</TableCaption>
                <Thead>
                  <Tr>
                    <Th>ProductId do SKU</Th>
                    <Th>Integração SKU ID</Th>
                    <Th>Nome do SKU</Th>
                    <Th>SKU</Th>
                    <Th>Código de Barras EAN</Th>
                    <Th>Cliente ID</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {csvData.map((row, index) => (
                    <Tr key={index}>
                      <Td>{row[0]}</Td>
                      <Td>{row[1]}</Td>
                      <Td>{row[2]}</Td>
                      <Td>{row[3]}</Td>
                      <Td>{row[4]}</Td>
                      <Td>{row[5]}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <div>Nenhum arquivo CSV selecionado</div>
            )}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}