// import { Box } from "@chakra-ui/react";
// import styles from "../styles/Footer.module.css";

// export default function Footer() {
//   return (
//     <Box
//       as="footer"
//       className={styles.footer}
//       position="absolute"
//       bottom={0}
//       w="100%"
//     >
//       <p>Omni Tools&copy; Jonas Zeferino - 2023</p>
//     </Box>
//   );
// }

import styles from "../styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Omni Tools&copy; Jonas Zeferino - 2023</p>
    </footer>
  );
}
