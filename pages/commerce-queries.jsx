import { Button, ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <span>Pedido:</span> 
      <ChakraProvider>
      <span>Hello Wolrd!</span>
      </ChakraProvider>
      <br />
      <span>Hello Wolrd!</span> <br />
    </div>
  );
}
