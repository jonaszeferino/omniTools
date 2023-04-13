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
   Flex,
   Box,
} from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

export default function Stocks() {
   let [analyzes, setAnalyzes] = useState([]);
   let [isLoading, setIsLoading] = useState(false);
   let [message, setMessage] = useState(false);
   let [isError, setError] = useState(null);
   let [selectedAnalyzes, setSelectedAnalyzes] = useState([]);
   let [analyzesCommerce, setAnalyzesCommerce] = useState([]);
   let [selectedRow, setSelectedRow] = useState(null);
   let [selectedRowCoomerce, setSelectedRowCommerce] = useState(null);

   const apiCall = async () => {
      setIsLoading(true);
      try {
         const response = await fetch("/api/v1/getStockAnalyzesOms", {
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

   const handleSelect = (event, analyze) => {
      if (event.target.checked) {
         setSelectedAnalyzes([...selectedAnalyzes, analyze]);
      } else {
         setSelectedAnalyzes(selectedAnalyzes.filter((a) => a !== analyze));
      }
   };

   const apiCallCommerce = async () => {
      setIsLoading(true);
      try {
         const response = await fetch("/api/v1/getStockAnalyzesCommerce", {
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

   const handleCommerceClick = async () => {
      try {
         const data = await apiCallCommerce();
         setMessage(data.message);
      } catch (error) {
         console.error(error);
         setError(error);
      }
   };

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
                  onClick={apiCall}
               >
                  OMS{" "}
               </Button>
               <Button
                  padding={5}
                  rounded={8}
                  size="lg"
                  mx="auto"
                  colorScheme="purple"
                  onClick={() => {
                     handleCommerceClick();
                     apiCall();
                  }}
               >
                  Commerce{" "}
               </Button>

               <br />
               {isLoading ? <Progress size="xs" isIndeterminate /> : null}
            </div>

            <br />
            <br />

            <div style={{ display: "flex" }}>
               <div style={{ width: "50%", marginLeft: "200px", maxWidth:"880px", marginRight:"10px"}}>
                
                
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
                        {analyzes.map((analyzesStockView, index) => (
                           <Tr
                              key={analyzesStockView.clientIdOms}
                              onClick={() => setSelectedRow(index)}
                              backgroundColor={
                                 selectedRow === index ? "gray.100" : ""
                              }
                           >
                              <Td>
                                 <Checkbox isChecked={selectedRow === index} />
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
               <div style={{ width: "60%", marginLeft: "10px"  }}>
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
                        {analyzesCommerce.map((analyzesCommerceView, index) => (
                           <Tr
                              key={analyzesCommerceView.clientIdCommerce}
                              onClick={() => setSelectedRowCommerce(index)}
                              backgroundColor={
                                 selectedRow === index ? "gray.100" : ""
                              }
                           >
                              <Td>
                                 <Checkbox isChecked={selectedRow === index} />
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
      </>
   );
}