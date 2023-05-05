import styles from "../styles/Home.module.css";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function Stocks() {
  let [skus, setSkus] = useState([]);
  let [stockUserOms, setStockUserOms] = useState("lepostiche");
  let [userCommerce, setskuUserCommerce] = useState("leposticheoms");
  let [selectedSkus, setSelectedSkus] = useState([]);

  let [skusFromCommerce, setSkusFromCommerce] = useState([]);

  let [isLoading, setIsLoading] = useState(false);
  let [message, setMessage] = useState();
  let [isSave, setIsSave] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  
  // Passo 1 - Veirifica na tabela de mapping os Skus dinstintos do OMS
  const apiCall = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/v1/getOmsSkusFromMapping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userOms: stockUserOms,
        }),
      });
      const data = await response.json();
      setSkus(data.results);
      console.log(data.results);

    setIsLoading(false);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleStep1Click = () => {
    const newSelectedSkus = skus.map((sku) => sku.skuOms);
    setSelectedSkus(newSelectedSkus);
  };
  console.log(selectedSkus);

  // Acima temos a chamada nos SKUS qeu o OMS analisou, e um array com estes SKUs
  // Agora aqui abaixo o segundo passo onde vamos consultar os SKUs do Array de Cima no commerce pra saber qual o ProductId

  const apiCall2 = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/getSkusFromCommerce", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skus: selectedSkus,
          userCommerce: userCommerce,
        }),
      });
      const data = await response.json();
      setSkusFromCommerce(data);
      setIsLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  console.log("recebido", skusFromCommerce);

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
                value={userCommerce}
                onChange={(event) => setskuUserCommerce(event.target.value)}
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
              apiCall();
              handleStep1Click();
            }}
          >
            Passo 1{" "}
          </Button>
          <Button
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            colorScheme="purple"
            onClick={() => {
              apiCall2();
            }}
          >
            Passo 2{" "}
          </Button>

          {showAlert ? (
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
              maxW="600px"
            >
              <TableCaption>Skus do OMS na Base dados</TableCaption>
              <Thead>
                <Tr>
                  <Th>ClientId OMS</Th>
                  <Th>SKU</Th>
                </Tr>
              </Thead>
              <Tbody>
                {skus.map((skusView) => (
                  <Tr key={skusView.skuOms}>
                    <Td>{stockUserOms}</Td>
                    <Td>{skusView.skuOms}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Table
              variant="striped"
              colorScheme="purple"
              size="sm"
              maxW="600px"
            >
              <TableCaption>ProductId do SKU no Commerce</TableCaption>
              <Thead>
                <Tr>
                  <Th>ProductID</Th>
                  <Th>SKU</Th>
                </Tr>
              </Thead>

              <Tbody>
                {skusFromCommerce.map((skusFromCommerceMap) => (
                  <Tr key={skusFromCommerceMap.SKU}>
                    <Td>{skusFromCommerceMap.ProductID}</Td>
                    <Td>{skusFromCommerceMap.SKU}</Td>
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
