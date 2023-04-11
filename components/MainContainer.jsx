import { Box, Container } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

export default function MainContainer({ children }) {
  return (
    <Box>
      <Navbar />
      <Container maxW="xl" mx="auto" px={4} py={8} mb={100}>
        {children}
      </Container>
      {/* <Footer /> */}
    </Box>
  );
}
