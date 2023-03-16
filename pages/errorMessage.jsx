import { Box } from "@chakra-ui/react";

const ErrorMessage = ({ message }) => {
  return (
    <Box
      textAlign="center"
      bg="red.500"
      color="white"
      p={4}
      borderRadius="md"
    >
      Id do cliente Errado Ou Não Existe {message}
    </Box>
  );
};

export default ErrorMessage;