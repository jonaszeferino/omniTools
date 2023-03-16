/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import React from "react";
import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";

export default function orders() {
  let [orderStock, setOrderStock] = useState([]);
  let [orderUser, setOrderUser] = useState();
  let [orderChannel, setOrderChannel] = useState();
  let [orderNumber, setOrderNumber] = useState();
  let [error, setError] = useState(null);
  let [dayNumber, setDaysNumber] = useState(null);

  const apiCall = (event) => {
    const url = `https://hub.omniplat.io/v1/clients/${orderUser}/channels/${orderChannel}/orders/${orderNumber}`;

    console.log("o que chamou: " + url);

    fetch(url, {
      headers: new Headers({
        Authorization: process.env.NEXT_PUBLIC_LE_AUTH,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setError(null);
          return response.json();
        } else {
          throw new Error("Dados Incorretos");
        }
      })
      .then((result) => setOrderStock(result))
      .catch((error) => setError(true));
  };

  return (
    <div>
      <h3 className={styles.title}>Pedidos Waiting</h3>
      <h2 className={styles.grid}>
        <br />
        <label type="text">
          Cliente:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={orderUser}
            onChange={(event) => setOrderUser(event.target.value)}
          ></input>
        </label>
        <br />
        <label type="text">
          Canal:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={orderChannel}
            onChange={(event) => setOrderChannel(event.target.value)}
          ></input>
        </label>
        <label type="text">
          Número do pedido:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={orderNumber}
            onChange={(event) => setOrderNumber(event.target.value)}
          ></input>
        </label>

        <button className={styles.card} onClick={apiCall}>
          Verificar
        </button>
      </h2>

      <ul>
        {orderStock.map((orders) => {
          const isOutdated =
            differenceInDays(new Date(), new Date(orders.createdAt)) > 5;
          return (
            <li key={orders.fulfillments}>
              <span>
                Situação: <strong> {orders.F1.status}</strong>
              </span>
              <br />
              <span>
                Situação: <strong> {orders.fulfillment.status}</strong>
              </span>
              <br />
              <span>
                <strong>
                  {" "}
                  {differenceInDays(new Date(), new Date(orders.createdAt))}
                </strong>
              </span>
              {"  "}-
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
