import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [isOtherLinksOpen, setIsOtherLinksOpen] = useState(false);
  const [isOMSLinksOpen, setIsOMSLinksOpen] = useState(false);

  const handleOtherLinksClick = () => {
    setIsOtherLinksOpen(!isOtherLinksOpen);
  };
  const handleOMSLinksClick = () => {
    setIsOMSLinksOpen(!isOMSLinksOpen);
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/orderwaitinggraphic">
            <a>Pedidos Pendentes OMS</a>
          </Link>
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
          <div onClick={handleOMSLinksClick} className={styles.category}>
          <span className={isOMSLinksOpen ? styles.arrowUp : styles.arrowDown} />
        OMS    
        </div>
      
          <div onClick={handleOtherLinksClick} className={styles.category}>
            Outros
            <span className={isOtherLinksOpen ? styles.arrowUp : styles.arrowDown} />
          </div>
          
          {isOtherLinksOpen && (
            <ul className={styles.otherLinks}>

              <li>
                <Link href="/stockAllAnalyzes">
                  <a>Analises</a>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/quotation">
            <a>Cotação</a>
          </Link>
        </li>
      </ul>
      {/* <div className={styles.login}>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button>Entrar</button>
      </div> */}
    </div>


  );
}