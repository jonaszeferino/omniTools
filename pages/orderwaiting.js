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
  let [dateFile, setDateFile] = useState(
    format(new Date(), "dd_MM_yyyy_HH_mm_ss")
  );

  const apiCall = (event) => {
    const url = `https://production-order.omniplat.io/v1/clients/${orderUser}/fulfillments/locations/${orderLocation}/status/WAITING?pageSize=50`;
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
          console.log("result: " + result),
          setIsLoading(false),
          setOrderStock(result.data),
          setIsLoading(false),
          setTotalResults(result.total)
        )
      )
      .catch((error) => setError(true), setIsLoading(false));
  };
  console.log("ordeStock:" + orderStock);
  console.log("ordeStockData:" + orderStock.data);
  const csvData = orderStock.map((orders) => [
    orders.orderId,
    orders.locationId,
    orders.channelId,
    orders.createdAt
      ? format(new Date(orders.createdAt), "dd/MM/yyyy HH:mm:ss")
      : "",
    differenceInDays(new Date(), new Date(orders.createdAt)),
  ]);

  console.log("csv:", csvData);

  return (
    <div>
      <h3 className={styles.title}>Pedidos Waiting</h3>
      <span>**com alerta para os parados a mais de 5 dias**</span>
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

        <button className={styles.card} onClick={apiCall}>
          Verificar
        </button>
      </h2>
      <span>{isLoading ? <div>Carregando...</div> : " "}</span>
      {isError === true ? (
        <ErrorPage message={`Verifique a grafia`}></ErrorPage>
      ) : (
        <div className={styles.grid}>
          {orderStock.map((reserve) => {
            const isOutdated =
              differenceInDays(new Date(), new Date(reserve.createdAt)) > 5;
            return (
              <div className={styles.card} key={reserve.orderId}>
                <span>Pedido: {reserve.orderId}</span> <br />
                <span>Canal: {reserve.channelId}</span> <br />
                <span>Location: {reserve.locationId}</span> <br />
                <span>
                  Data do Pedido:{" "}
                  {format(new Date(reserve.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </span>
                <br />
                <span>
                  Dias Nesse Status:{" "}
                  <strong>
                    {" "}
                    {differenceInDays(new Date(), new Date(reserve.createdAt))}
                  </strong>
                </span>
                {"  "}-
                {isOutdated && (
                  <span style={{ color: "red", font: "bold" }}>
                    {`Pedido nesse status ${differenceInDays(
                      new Date(),
                      new Date(reserve.createdAt)
                    )} dias`}
                  </span>
                )}
                <br />
              </div>
            );
          })}
        </div>
      )}
      {csvData && (
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
      )}
    </div>
  );
}
