/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import React from "react";
import ErrorPage from "./error-page";
import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
import { CSVLink } from "react-csv";

export default function orders() {
  let [orderStock, setOrderStock] = useState([]);
  let [orderUser, setOrderUser] = useState();
  let [orderLocation, setOrderLocationId] = useState();
  let [isError, setError] = useState(null);
  let [totalResults, setTotalResults] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [dateFile, setDateFile] = useState(format(new Date(), "dd-MM-yyyy"));

  const apiCall = (event) => {
    const url = `https://production-order.omniplat.io/v1/clients/${orderUser}/fulfillments/locations/${orderLocation}/status/WAITING?page=1`;
    let authorizationValue;
    setIsLoading(true);

    switch (orderUser) {
      case "lepostiche":
        authorizationValue = process.env.NEXT_PUBLIC_LEPOSTICHE;
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

    console.log("verificara URL:" + url);

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
          setOrderStock(result),
          setIsLoading(false),
          setTotalResults(result.total)
        )
      )
      .catch((error) => setError(true), setIsLoading(false));
  };

  return (
    <div>
      <h3 className={styles.title}>Pedidos Waiting</h3>
      <h2 className={styles.grid}>
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

        <button className={styles.card} onClick={apiCall}>
          Verificar
        </button>
      </h2>

      <span>{isLoading ? <div>Carregando...</div> : " "}</span>

      {isError === true ? (
        <ErrorPage message={`Verifique a grafia`}></ErrorPage>
      ) : (
        <ul>
          {orderStock &&
            orderStock.data &&
            orderStock.data.length > 0 &&
            orderStock.data.map((orders) => {
              const isOutdated =
                differenceInDays(new Date(), new Date(orders.createdAt)) > 5;

              return (
                <div className={styles.card} key={orders.orderId}>
                  <span>
                    Pedido: <strong> {orders.orderId}</strong>
                  </span>
                  <br />
                  <span>
                    Dias Nesse Status:{" "}
                    <strong>
                      {" "}
                      {differenceInDays(new Date(), new Date(orders.createdAt))}
                    </strong>
                  </span>
                  {"  "}-{" "}
                  {isOutdated && (
                    <span style={{ color: "red", font: "bold" }}>
                      Pedido parado a mais de 5 dias
                    </span>
                  )}
                  <br />
                  <span>
                    Data do Pedido:
                    <strong>
                      {orders.createdAt.length > 0
                        ? format(new Date(orders.createdAt), " dd/MM/yyyy")
                        : ""}
                    </strong>
                    <br />
                  </span>
                  LocationId:{" "}
                  <span>
                    <strong> {orders.locationId}</strong>
                  </span>
                  <br />
                  Canal:{" "}
                  <span>
                    <strong> {orders.channelId}</strong>
                  </span>
                  <br />
                  <a
                    href={`https://oms.chaordic.com.br/deliveries/${orders.orderId}?channel=${orders.channelId}&fid=F1`}
                    as="a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>Link Do Pedido</strong>
                  </a>
                  <br />
                  <br />
                </div>
              );
            })}
        </ul>
      )}

      <span>
        Total de Resultados:
        <strong> {totalResults}</strong>
      </span>
      <br />
    </div>
  );
}
