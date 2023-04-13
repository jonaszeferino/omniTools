import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import {ChakraProvider, Divider ,Box
} from "@chakra-ui/react";

export default function TopbarBelow({ subTitle }) {
  return (
    
<>
    <ChakraProvider>
    <Box ml="196px" borderWidth="2px" borderColor="black">
      <Divider orientation='horizontal' />
         </Box>
    </ChakraProvider>
      <div className={styles.topBarBelow}>
        
      </div>
      </>               
    );
}






