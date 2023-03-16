// import { Box } from "@chakra-ui/react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import styles from "../styles/Navbar.module.css";

// export default function Navbar() {
//   const router = useRouter();

//   return (
//     <Box as="nav" d="flex" justifyContent="space-between" alignItems="center">
//       <Link href="/">
//         <a>Logo</a>
//       </Link>
//       <Box
//         as="ul"
//         d="flex"
//         listStyleType="none"
//         flexDir={{ base: "column", md: "row" }}
//         textAlign={{ base: "center", md: "left" }}
//         mt={{ base: 4, md: 0 }}
//       >
//         <li className={router.pathname === "/" ? styles.active : ""}>
//           <Link href="/">
//             <a>Home</a>
//           </Link>
//         </li>
//         <li
//           className={router.pathname === "/orderwaiting" ? styles.active : ""}
//         >
//           <Link href="/orderwaiting">
//             <a>Pedidos Pendentes</a>
//           </Link>
//         </li>
//         <li
//           className={router.pathname === "/reservations" ? styles.active : ""}
//         >
//           <Link href="/reservations">
//             <a>Reservas</a>
//           </Link>
//         </li>
//         <li className={router.pathname === "/quotation" ? styles.active : ""}>
//           <Link href="/quotation">
//             <a>Cotação</a>
//           </Link>
//         </li>
//       </Box>
//     </Box>
//   );
// }

import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/orderwaiting">
          <a>Pedidos Pendentes</a>
        </Link>
        <ul></ul>
      </li>
      <li>
        <Link href="/reservations">
          <a>Reservas</a>
        </Link>
      </li>
      <li>
        <Link href="/quotation">
          <a>Cotação</a>
        </Link>
      </li>
    </ul>
  );
}

// index vai ser sempre o '/' ou seja acesso a pasta raiz
