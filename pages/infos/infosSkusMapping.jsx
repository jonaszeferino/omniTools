import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Link
} from "@chakra-ui/react";

export default function WalkthroughPopover() {
  const initialFocusRef = React.useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const informationPages = [
    "O arquivo de mapeamento de produtos deve estar em formato CSV, separado por vírgulas.",
    "O arquivo pode ter até 50 MB de tamanho e pode ser baixado no Linx Commerce através do link https://loja.admin.core.dcg.com.br/#/Catalog/ProductImportAndExport/. Ao exportar, é necessário marcar a opção \"Exportar também as variações (SKUs)\".",
    "Os nomes das colunas no arquivo não precisam ser idênticos, mas precisam seguir a ordem das informações necessárias.",
    "Portanto, do arquivo exportado, é necessário apenas as seguintes colunas, nessa ordem: ProductID (SKU), Código de Integração do SKU, Nome do SKU, Código de Referência do SKU, EAN do SKU e, após excluir todas as outras colunas, deixar a última com o TenantId do Cliente (por exemplo: leposticheoms).",
    "Obs.: É encessário deixar apenas as colunas citadas. Você pode baixar um modelo do CSV com as colunas necessárias neste link: "
  ];

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button>Infos e modelo CSV</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Informações importantes
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {informationPages[currentPage]}
          {currentPage === informationPages.length - 1 && (
            <Link href="/ModeloImportacaoDepara.csv" download>
              Modelo do CSV
            </Link>
          )}
        </PopoverBody>


        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Button
            variant="outline"
            isDisabled={currentPage === 0}
            onClick={handlePrevPage}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            isDisabled={currentPage === informationPages.length - 1}
            onClick={handleNextPage}
          >
            Próximo
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
