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
} from "@chakra-ui/react";

export default function WalkthroughPopover() {
  const initialFocusRef = React.useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const informationPages = [
    `O ClientId: é o TenantId do Linx Commerce.
     Exemplo leposticheoms, stz, lebes`,
    `O Canal: é o id do estoque no Linx Commerce: https://clientid.admin.core.dcg.com.br/#/Catalog/Warehouse/`,
    `A Disponibilidade é a propriedade que está no BD como: availability = I ou O (InStock / OutOfStock) Habilitado / Desabilitado`,
    `A API retornará nesse momento 100 registros`,
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
        <Button>infos</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Enquanto Carrega Veja Como funciona
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{informationPages[currentPage]}</PopoverBody>
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
