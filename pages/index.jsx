import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";
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
  Wrap,
  WrapItem,
  useToast 
} from "@chakra-ui/react";

export default function Home() {

  const toast = useToast()
  const variants = ['Estoque Commerce', 'Estoque OMS', 'Reservas', 'Analises']


  return (
    <>
      <ChakraProvider>
   
      <Topbar title="Omni Tools" />
            <TopbarBelow />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Omni Tools
        </h1>

        <p className={styles.description}>
          Ferramentas de análise e desempenho Omni Channel
          
        </p>
        <Wrap>
      {variants.map((variant, i) => (
        <WrapItem key={i}>
          <Button
            onClick={() =>
              toast({
                title: variant,
                variant: variant,
                isClosable: true,
                style: { backgroundColor: "green.500" } 
              })
            }
          >
           {variant}
          </Button>
        </WrapItem>
      ))}
    </Wrap>


      </main>
      </ChakraProvider>
      </>
  )
}
