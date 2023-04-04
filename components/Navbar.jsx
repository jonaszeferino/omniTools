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
          <a>Pedidos Pendentes OMS</a>
        </Link>
        <ul></ul>
      </li>
      <li>
        <Link href="/reservations">
          <a>Reservas OMS</a>
        </Link>
      </li>
  
      <li>
        <Link href="/stockbylocation">
          <a>Estoque Filial OMS</a>
        </Link>
      </li>
      <li>
        <Link href="/stockOnCommerce">
          <a>Estoque Canal Commerce</a>
        </Link>
      </li>
      <li>
        <Link href="/stockOnOmsChannel">
          <a>Estoque Canal OMS</a>
        </Link>
      </li>
        <li>
          <Link href="/stockAllAnalyzes">
          <a>Analises</a>
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
