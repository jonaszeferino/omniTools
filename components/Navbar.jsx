import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [isOtherLinksOpen, setIsOtherLinksOpen] = useState(false);
  const [isOMSLinksOpen, setIsOMSLinksOpen] = useState(false);
  const [isCommerceLinksOpen, setIsCommerceLinksOpen] = useState(false);
  const [isVerificationsLinksksOpen, setIsVerificationsLinksksOpen] =
    useState(false);

  const handleOtherLinksClick = () => {
    setIsOtherLinksOpen(!isOtherLinksOpen);
  };
  const handleOMSLinksClick = () => {
    setIsOMSLinksOpen(!isOMSLinksOpen);
  };
  const handleCommerceLinksClick = () => {
    setIsCommerceLinksOpen(!isCommerceLinksOpen);
  };
  const handleVerificationsLinksClick = () => {
    setIsVerificationsLinksksOpen(!isVerificationsLinksksOpen);
  };

  return (
    <div className={styles.sidebar} style={{ listStyleType: "none" }}>
      <ul>
        <li
          style={{
            backgroundColor: "#280A3C",
            color: "white",
            listStyleType: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <br />
          <Image
            src="/iconizer-reorder-three-outline.svg"
            alt="Ícone de Reordenação"
            width={20}
            height={20}
            style={{ marginLeft: "10px" }}
          />
          <Link href="/">
            <a>
              <strong>Home</strong>
            </a>
          </Link>
          <br />
          <br />
        </li>

        <div
          onClick={handleCommerceLinksClick}
          className={styles.category}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src="/iconizer-reorder-three-outline.svg"
            alt="Ícone de Reordenação"
            width={20}
            height={20}
            style={{ marginLeft: "10px" }}
          />
          <span
            className={isCommerceLinksOpen ? styles.arrowUp : styles.arrowDown}
          />
          <strong>Commerce</strong>
        </div>

        {isCommerceLinksOpen && (
          <ul style={{ marginRight: "20px" }}>
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/iconizer-reorder-two-outline.svg"
                  alt="Ícone de Reordenação"
                  width={20}
                  height={20}
                />
                <Link href="/stock-on-commerce">
                  <a>Estoque Canal</a>
                </Link>
              </div>
            </li>
          </ul>
        )}
        {/* Link GLobal OMS funcionando ok, usar mesma lógica acima */}
        <li>
          <div
            onClick={handleOMSLinksClick}
            className={styles.category}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src="/iconizer-reorder-three-outline.svg"
              alt="Ícone de Reordenação"
              width={20}
              height={20}
              style={{ marginLeft: "10px" }}
            />
            <strong>OMS</strong>

            <span
              className={isOMSLinksOpen ? styles.arrowUp : styles.arrowDown}
            />
          </div>

          {isOMSLinksOpen && (
            <ul>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/order-waiting">
                    <a>Pedidos Pendentes</a>
                  </Link>
                </div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/pending-reservations">
                    <a>Reservas Pendentes</a>
                  </Link>
                </div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/stock-on-oms-channel">
                    <a>Estoque por Canal</a>
                  </Link>
                </div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/stock-by-location">
                    <a>Estoque por Filial</a>
                  </Link>
                </div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/locations-quantity">
                    <a>Filiais OMS</a>
                  </Link>
                </div>
              </li>
            </ul>
          )}

          {/* Link GLobal Outros funcionando ok, usar mesma lógica acima */}
          <div
            onClick={handleVerificationsLinksClick}
            className={styles.category}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src="/iconizer-reorder-three-outline.svg"
              alt="Ícone de Reordenação"
              width={20}
              height={20}
              style={{ marginLeft: "10px" }}
            />
            <strong>Verificações</strong>

            <span
              className={
                isVerificationsLinksksOpen ? styles.arrowUp : styles.arrowDown
              }
            />
          </div>

          {isVerificationsLinksksOpen && (
            <ul style={{ marginRight: "20px" }}>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/stock-all-analyzes">
                    <a>Análises</a>
                  </Link>
                </div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/commerce-sku-mapping">
                    <a>Depara SKUs</a>
                  </Link>
                </div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/iconizer-reorder-two-outline.svg"
                    alt="Ícone de Reordenação"
                    width={20}
                    height={20}
                  />
                  <Link href="/skus-mapped">
                    <a>SKUs Mapeados</a>
                  </Link>
                </div>
              </li>
            </ul>
          )}
        </li>
        <div
          onClick={handleOtherLinksClick}
          className={styles.category}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image
            src="/iconizer-reorder-three-outline.svg"
            alt="Ícone de Reordenação"
            width={20}
            height={20}
            style={{ marginLeft: "10px" }}
          />
          <strong>Outros</strong>

          <span
            className={isOtherLinksOpen ? styles.arrowUp : styles.arrowDown}
          />
        </div>
        <li>
          {isOtherLinksOpen && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/iconizer-reorder-two-outline.svg"
                alt="Ícone de Reordenação"
                width={20}
                height={20}
              />
              <Link href="/oms-quotation">
                <a>Cotação OMS</a>
              </Link>
            </div>
          )}
        </li>
      </ul>

      <div>
        <Image
          src="/omniLogo.png"
          alt="Omni Logo"
          width={100}
          height={50}
          className={styles.logoContainer}
        />
      </div>
    </div>
  );
}
