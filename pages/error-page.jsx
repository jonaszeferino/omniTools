import styles from "../styles/Home.module.css";

export default function ErrorPage({message}) {
 return <div className={styles.cardError}> <strong>Id do cliente Errado Ou Não Existe</strong> { message } </div>
 
}


// import { Box } from "@chakra-ui/react";

// const ErrorPage = ({ message }) => {
//   return (
//     <Box
//       textAlign="center"
//       bg="red.500"
//       color="white"
//       p={4}
//       borderRadius="md"
//     >
//       Id do cliente Errado Ou Não Existe {message}
//     </Box>
//   );
// };

// export default ErrorPage;