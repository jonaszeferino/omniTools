/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import React from "react";
import ErrorPage from "./error-page";
import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
import { CSVLink } from "react-csv";

export default function orders() {
  let [orderLocations, setOrdersLocations] = useState([]);
  let [orderUser, setOrderUser] = useState();
  let [orderLocation, setOrderLocationId] = useState();
  let [isError, setError] = useState(null);
  let [totalResults, setTotalResults] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );
  const [locationIds, setLocationIds] = useState([]);

  //location e status

  const urlString = `https://homolog.omniplat.io/v1/clients/${orderUser}/locations`;

  const apiCall2 = () => {
    const url = urlString;
    setIsLoading(true);

    fetch(url, {
      headers: new Headers({
        Authorization: process.env.NEXT_PUBLIC_LEPOSTICHE_HOMOLOG,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setError(false);
          return response.json();
        } else {
          throw new Error("Dados Incorretos");
        }
      })
      .then((result) => {
        setOrdersLocations(result);
        setIsLoading(false);
        result.forEach((location) => {
          setLocationIds((prevIds) => [...prevIds, location.id]);
          apiCall(location.id);
          const teste = orderStock.map((orders) => [orders.id]);
          console.log("teste", teste);
        });
      })
      .catch((error) => setError(true));
  };

  console.log("primeira chamada:", urlString);

  const apiCall = (location) => {
    const url = `https://homolog.omniplat.io/v1/clients/${orderUser}/channels/site/fulfillments/locations/${orderLocation}/status/PENDING`;

    let authorizationValue;
    setIsLoading(true);

    switch (orderUser) {
      case "lepostiche":
        authorizationValue = process.env.NEXT_PUBLIC_LEPOSTICHE_HOMOLOG;
        break;
      case "lebes":
        authorizationValue = process.env.NEXT_PUBLIC_LEBES;
        break;
      case "viaveneto":
        authorizationValue = process.env.NEXT_PUBLIC_VIA;
        break;
      case "vago":
        authorizationValue = process.env.NEXT_PUBLIC_LEBES;
        break;
      default:
        authorizationValue = process.env.NEXT_PUBLIC_LEBES;
    }

    fetch(url, {
      headers: new Headers({
        Authorization: authorizationValue,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setError(false);

          return response.json();
        } else {
          throw new Error("Dados Incorretos");
        }
      })
      .then(
        (result) => (
          console.log("result: ", result),
          setIsLoading(false),
          setTotalResults(result.total)
        )
      )
      .catch((error) => setError(true), setIsLoading(false));
  };

  return (
    <div>
      <h3 className={styles.title}>Total de Pedidos Por Locations</h3>
      <span></span>
      <h2>
        <br />
        <label type="text">
          Client:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={orderUser}
            onChange={(event) => setOrderUser(event.target.value)}
          ></input>
        </label>
        <label type="text">
          LocationID:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={orderLocation}
            onChange={(event) => setOrderLocationId(event.target.value)}
          ></input>
        </label>
        <br />
        <button className={styles.card} onClick={apiCall2}>
          Verificar Locations
        </button>
        <br />
        <button className={styles.card} onClick={apiCall}>
          Verificar Pedidos
        </button>
        <br />
      </h2>
      <span>{isLoading ? <div>Carregando...</div> : " "}</span>
      {isError === true ? (
        <ErrorPage message={`Verifique a grafia`}></ErrorPage>
      ) : (
        <div className={styles.grid}>
          <div className={styles.card}>
            <span>
              Total de Pedidos: {totalResults} da LocationID: {orderLocation}
            </span>{" "}
            <br />
            <br />
          </div>
        </div>
      )}
      <div className={styles.grid}>
        <div className={styles.card}>
          {orderLocations.map((order) => (
            <div key={order.id}>
              <span className={styles.spantext}>{order.id}</span> <br />
            </div>
          ))}
        </div>
        {/* {csvData && (
        <CSVLink
          style={{
            backgroundColor: "gray",
            borderBlockColor: "black",
            padding: "1rem",
            borderRadius: "1rem",
            borderBottomStyle: "groove",
          }}
          data={csvData}
          headers={["Pedido", "Filial", "Canal", "DataPedido", "DiasParado"]}
          separator={";"}
          filename={`pedidos_waiting_${orderUser}_${dateFile}`}
        >
          Exportar para CSV
        </CSVLink>
      )} */}
      </div>
    </div>
  );
}
