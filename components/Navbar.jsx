import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [isOtherLinksOpen, setIsOtherLinksOpen] = useState(false);
  const [isOMSLinksOpen, setIsOMSLinksOpen] = useState(false);
  const [isCommerceLinksOpen, setIsCommerceLinksOpen] = useState(false);

  const handleOtherLinksClick = () => {
    setIsOtherLinksOpen(!isOtherLinksOpen);
  };
  const handleOMSLinksClick = () => {
    setIsOMSLinksOpen(!isOMSLinksOpen);
  };
  const handleCommerceLinksClick = () => {
    setIsCommerceLinksOpen(!isCommerceLinksOpen);
  };

  return (
    <div className={styles.sidebar} style={{listStyleType: "none"}}>
    <ul>
      <li style={{ backgroundColor: "#280A3C", color: "white", listStyleType: "none" }}>
        <br />
        <Link href="/">
          <a><strong>Home</strong></a>
        </Link>
        <br />
        <br />
      </li>
      <div onClick={handleCommerceLinksClick} className={styles.category}>
        <span className={isCommerceLinksOpen ? styles.arrowUp : styles.arrowDown} />
        <strong>Commerce</strong>
      </div>
      {isCommerceLinksOpen && (
        <ul className={styles.otherLinks}>
          <li>
            <Link href="/stockOnCommerce">
              <a>→ Estoque Canal</a>
            </Link>
          </li>
        </ul>
      )}
  
      {/* Link GLobal OMS funcionando ok, usar mesma lógica acima */}
      <li style={{listStyleType: "none"}} >
        <div onClick={handleOMSLinksClick}  >
          <span className={isOMSLinksOpen ? styles.arrowUp : styles.arrowDown} />
          <strong>OMS</strong>   
        </div>
        {isOMSLinksOpen && (
          <ul>
            <li >
              <Link href="/orderwaitinggraphic">
                <a>→Pedidos Pendentes</a>
              </Link>
            </li>
            <li>
              <Link href="/reservations">
                <a>→Reservas Pendentes</a>
              </Link>
            </li>
           
            <li>
              <Link href="/stockOnOmsChannel">
                <a>→Estoque por Canal</a>
              </Link>
            </li>
            <li>
              <Link href="/stockbylocation">
                <a>→Estoque por Filial</a>
              </Link>
            </li>

          </ul>
        )}
  
        {/* Link GLobal Outros funcionando ok, usar mesma lógica acima */}
        <div onClick={handleOtherLinksClick} className={styles.category}>
          <strong>Outros</strong>
          <span className={isOtherLinksOpen ? styles.arrowUp : styles.arrowDown} />
        </div>
  
        {isOtherLinksOpen && (
          <ul className={styles.otherLinks}>
            <li>
              <Link href="/stockAllAnalyzes">
                <a>→Analises</a>
              </Link>
            </li>
            <li>
              <Link href="/quotation">
                <a>→Cotação</a>
              </Link>
            </li>
          </ul>
        )}
      </li>
    </ul>
  
    <div>
      <Image src="/omniLogo.png" alt="Omni Logo" width={100} height={50} className={styles.logoContainer} />
    </div>
  </div>


  );
}