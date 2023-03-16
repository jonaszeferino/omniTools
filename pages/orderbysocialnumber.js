import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import { format, differenceInDays } from "date-fns";
import { CSVLink } from "react-csv";

export default function Reservations() {
  let [reservationStock, setReservationStock] = useState([]);
  let [reservationUser, setReservationUser] = useState();
  let [reservationBasic, setReservationBasic] = useState();
  let [messageError, setMessageError] = useState();

  let [isError, setError] = useState(false);

  let [isLoading, setIsLoading] = useState(false);

  const apiCall = (event) => {
    const url = `https://homolog.omniplat.io/v1/clients/lepostiche/search/ordersBySocialNumber?socialNumber=40449679039&startCreatedAt=2022-12-01+00%3A00%3A00&endCreatedAt=2023-03-01+14%3A24%3A48&page=1&pageSize=1&sort%5Bdesc%5D=createdAt`;

    let authorizationValue;
    setIsLoading(true);

    switch (reservationUser) {
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
        setError(false);
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Dados Incorretos");
        }
      })
      .then((result) => setReservationStock(result.data), setIsLoading(false))
      .catch((error) => {
        setError(true);
        setIsLoading(false);
        console.log("teste" + error.message);
        setMessageError("Ocorreu um erro ao buscar as reservas.");
        setReservationStock([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("reservationStock: ", reservationStock);

  const data = reservationStock.map((reserve) => [
    format(new Date(reserve.createdAt), "dd/MM/yyyy HH:mm:ss"),
    reserve.clientId.replace(/"/g, ""),
    reserve.channelId.replace(/"/g, ""),

    reserve.orderId.replace(/"/g, ""),
    reserve.quantity.toString().replace(/"/g, ""),
    differenceInDays(new Date(), new Date(reserve.createdAt)),
  ]);

  console.log("csvOK:", data);

  const currentDate = new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = currentDate
    .toLocaleString("pt-BR", options)
    .replace(/\//g, " ");
  const dateFile = formattedDate.replace(/[/: ]/g, "_");

  return (
    <div>
      <h3 className={styles.title}>Reservas Não Finalizadas</h3>
      <span>**Com alerta para reservas pendentes a mais de 10 dias**</span>
      <h2 className={styles.grid}>
        {" "}
        <br />
        <label type="text">
          Client:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={reservationUser}
            onChange={(event) => setReservationUser(event.target.value)}
          ></input>
        </label>
        <button className={styles.card} onClick={apiCall}>
          Verificar
        </button>
      </h2>

      <span>{isLoading ? <div>Carregando...</div> : " "}</span>

      <br />

      {isError === true ? (
        <ErrorPage message={`~Confira o Texto~ Erro: ${messageError} `}>
          {" "}
        </ErrorPage>
      ) : (
        <div className={styles.grid}>
          {reservationStock.map((reserve) => {
            const isOutdated =
              differenceInDays(new Date(), new Date(reserve.createdAt)) > 10;
            return (
              <div className={styles.card} key={reserve.id}>
                <span>Cliente: {reserve.clientId}</span> <br />
                <span>Canal: {reserve.channelId}</span> <br />
                <span>Location: {reserve.locationId}</span> <br />
                <span>
                  Data:{" "}
                  {format(new Date(reserve.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </span>
                <br />
              </div>
            );
          })}
        </div>
      )}
      <CSVLink
        style={{
          backgroundColor: "gray",
          borderBlockColor: "black",
          padding: "1rem",
          borderRadius: "1rem",
          borderBottomStyle: "groove",
        }}
        data={data}
        headers={[
          "DataPedido",
          "Cliente",
          "Chanal",
          "Filial",
          "Sku",
          "Pedido",
          "Quantidade",
          "DiasParado",
        ]}
        separator={";"}
        filename={`reservas_pendentes_${dateFile}`}
      >
        Exportar para CSV
      </CSVLink>
    </div>
  );
}
