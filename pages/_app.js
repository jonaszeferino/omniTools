import { ChakraProvider, Container, CSSReset } from "@chakra-ui/react";
import "../styles/globals.css";
import MainContainer from "../components/MainContainer";

function MyApp({ Component, pageProps }) {
  return (
    <MainContainer>
      <Container>
        <Component {...pageProps} />
      </Container>
    </MainContainer>
  );
}

export default MyApp;

// import MainContainer from "../components/MainContainer";
// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return (
//     <MainContainer>
//       <Component {...pageProps} />
//     </MainContainer>
//   );
// }

// export default MyApp;
