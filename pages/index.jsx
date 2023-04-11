
import { ChakraProvider } from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import TopbarBelow from "../components/TopbarBelow";

export default function Home() {
  return (
    <div>
      <div>

        <Topbar title="Home " />
      <TopbarBelow subTitle="Teste" />
      
      
      
      <ChakraProvider>
      </ChakraProvider>


        <br />
      </div>
    </div>
  );
}
