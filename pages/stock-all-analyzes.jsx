import styles from "../styles/Home.module.css";

import { format } from "date-fns-tz";
import { useState } from "react";
import {
  Button,
  Heading,
  ChakraProvider,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Checkbox,
} from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

export default function Stocks() {
  let [analyzes, setAnalyzes] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [message, setMessage] = useState(false);
  let [isError, setError] = useState(null);
  let [selectedAnalyzes, setSelectedAnalyzes] = useState([]);
  let [verifications, setVerifications] = useState([]);
  let [analyzesCommerce, setAnalyzesCommerce] = useState([]);
  let [analysisCommerce, setAnalysisCommerce] = useState("");
  let [analysisOms, setAnalysisOms] = useState("");
  let [selectedRowCoomerce, setSelectedRowCommerce] = useState(null);

  const apiCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/mongoGetStockAnalyzesOms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados.");
      }
      const data = await response.json();
      setAnalyzes(data.results);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };

  const apiCallCommerce = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/mongoGetStockAnalyzesCommerce", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados.");
      }
      const data = await response.json();
      setAnalyzesCommerce(data.results);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  console.log(analysisCommerce)

  const apiCallVerification = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/getStockVerificationCommerceOms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          omsAnalysis: analysisOms,
          commerceAnalysis: analysisCommerce,
        }),
      });

      const data = await response.json();
      setVerifications(data.results);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // verificação do checkbox
  const handleCheckboxChangeOms = (event, analyzesStockView) => {
    if (event.target.checked) {
      setAnalysisOms(analyzesStockView.viewName);
    } else {
      setAnalysisOms(null);
    }
  };
  const handleCheckboxChangeCommerce = (event, analyzesStockView) => {
    if (event.target.checked) {
      setAnalysisCommerce(analyzesStockView.viewNameCommerce);
    } else {
      setAnalysisCommerce(null);
    }
  };

  console.log("commerce", analysisCommerce);
  console.log("oms", analysisOms);

  return (
    <>
      <ChakraProvider>
        <Topbar title="Analises " />
        <TopbarBelow />
        <Heading as="h1" size="m" textAlign="center">
          ⚠️ 🚧 Em construção 🚧 ⚠️
        </Heading>
        <br />
        <div
          style={{
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
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
            OMS 1{" "}
          </Button>
          <Button
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            colorScheme="purple"
            onClick={() => {
              apiCallCommerce();
            }}
          >
            Commerce 2{" "}
          </Button>

          <Button
            padding={5}
            rounded={8}
            size="lg"
            mx="auto"
            colorScheme="purple"
            onClick={() => {
              apiCallVerification();
            }}
          >
            Verificação 3{" "}
          </Button>

          <br />
          {isLoading ? <Progress size="xs" isIndeterminate /> : null}
        </div>

        <br />
        <br />

        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "50%",
              marginLeft: "200px",
              maxWidth: "880px",
              marginRight: "10px",
            }}
          >
            <Table
              variant="striped"
              colorScheme="purple"
              size="sm"
              maxW="400px"
            >
              <TableCaption>
                Resultado Das Últimas 30 Analises de Estoque No OMS
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Selecione</Th>
                  <Th>Plataforma</Th>
                  <Th>Nome do teste</Th>
                  <Th>Cliente</Th>
                  <Th>Data</Th>
                </Tr>
              </Thead>
              <Tbody>
                {analyzes.map((analyzesStockView) => (
                  <Tr key={analyzesStockView.clientIdOms}>
                    <Td>
                      <Checkbox
                        onChange={(event) =>
                          handleCheckboxChangeOms(event, {
                            viewName: analyzesStockView.viewName,
                          })
                        }
                      />
                    </Td>
                    <Td>OMS</Td>
                    <Td>{analyzesStockView.viewName}</Td>
                    <Td>{analyzesStockView.clientIdOms}</Td>
                    <Td>
                      {format(
                        new Date(analyzesStockView.createdDate),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
          <div style={{ width: "60%", marginLeft: "10px" }}>
            <Table
              variant="striped"
              colorScheme="purple"
              size="sm"
              maxW="400px"
            >
              <TableCaption>
                Resultado Das Últimas 30 Analises de Estoque No Commerce
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Selecione</Th>
                  <Th>Plataforma</Th>
                  <Th>Nome do teste</Th>
                  <Th>Cliente</Th>
                  <Th>Data</Th>
                </Tr>
              </Thead>
              <Tbody>
                {analyzesCommerce.map((analyzesCommerceView) => (
                  <Tr key={analyzesCommerceView.clientIdCommerce}>
                    <Td>
                      <Checkbox
                        onChange={(event) =>
                          handleCheckboxChangeCommerce(event, {
                            viewNameCommerce: analyzesCommerceView.viewName,
                          })
                        }
                      />
                    </Td>
                    <Td>Commerce</Td>
                    <Td>{analyzesCommerceView.viewName}</Td>
                    <Td>{analyzesCommerceView.clientIdCommerce}</Td>
                    <Td>
                      {format(
                        new Date(analyzesCommerceView.createdDate),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </ChakraProvider>
      <div>
        <div
          style={{ width: "100%", marginLeft: "680px", marginRight: "auto" }}
        >
          <ChakraProvider>
            <Table
              variant="striped"
              colorScheme="purple"
              size="sm"
              maxW="400px"
            >
              <TableCaption>Resultado Da verificação</TableCaption>
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>SKU</Th>
                  <Th>Estoque Commerce</Th>

                  <Th>Estoque OMS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {verifications.map((verificationsViewer) => (
                  <Tr key={verificationsViewer.sku}>
                    <Td>
                      {parseInt(verificationsViewer.BalanceCommerce) ===
                      parseInt(verificationsViewer.balanceOMS) ? (
                        <span style={{ fontWeight: "bold", color: "blue" }}>
                          OK
                        </span>
                      ) : (
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          Erro
                        </span>
                      )}
                    </Td>

                    <Td>{verificationsViewer.sku}</Td>
                    <Td>{verificationsViewer.BalanceCommerce}</Td>
                    <Td>{verificationsViewer.balanceOMS}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ChakraProvider>
        </div>
      </div>
    </>
  );
}
