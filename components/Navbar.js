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
        <Link href="/orderwaitinggraphic">
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
      <li>
        <Link href="/stockbylocation">
          <a>Estoque por Filial</a>
        </Link>
      </li>
      <li>
        <Link href="/stockOnCommerce">
          <a>Estoque No Linx Commerce</a>
        </Link>
      </li>
    </ul>
  );
}

// index vai ser sempre o '/' ou seja acesso a pasta raiz
