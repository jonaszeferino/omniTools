import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Quotation = () => {
  //fundamentais para o primeiro calculo
  const [skuQuotationSkuQty, setSkuQuotationSkuQty] = useState(1);
  const [skuQuotationWeight, setSkuQuotationWeight] = useState(0.5);
  const [skuQuotationHeight, setSkuQuotationHeight] = useState(290);
  const [skuQuotationWidth, setSkuQuotationWidth] = useState(380);
  const [skuQuotationLength, setSkuQuotationLength] = useState(140);
  const [skuQuotationFactor, setSkuQuotationFactor] = useState(167);
  const [skuQuotationVolumeCalculeted, setSkuQuotationVolumeCalculeted] =
    useState(0);
  const [skuQuotationBetter, setSkuQuotationBetter] = useState();

  // fundamentais para o segundo cálculo
  const [skuQuotationDimensionFactor, setSkuQuotationDimensionFactor] =
    useState(0);
  const [skuQuotationMaxWeight, setSkuQuotationMaxWeight] = useState(10);
  const [skuQuotationOverweightFactor, setSkuQuotationOverweightFactor] =
    useState(0);
  const [
    skuQuotationGrisFactorCalculated,
    setSkuQuotationGrisFactorCalculated,
  ] = useState(0);

  //fundamentais para o terceiro calculo:
  const [skuQuotationGris, setSkuQuotationGris] = useState(0);
  const [skuQuotationPrice, setSkuQuotationPrice] = useState(259);
  const [skuGrisCalculated, setSkuGrisCalculated] = useState(0);
  const [skuQuotationRowGrisValue, setSkuQuotationRowGrisValue] = useState(0.6);
  const [skuQuotationRowAdValorenValue, setSkuQuotationRowAdValorenValue] =
    useState(0);
  const [skuQuotationRowShhipingCost, setSkuQuotationRowShhipingCost] =
    useState(14.43);
  //erros state
  const [errorMessage, setErrorMessage] = useState("");

  const [isCalculoOneExecuted, setIsCalculoOneExecuted] = useState(false);
  const [isCalculoTwoExecuted, setIsCalculoTwoExecuted] = useState(false);
  const [isCalculoThreeExecuted, setIsCalculoThreeExecuted] = useState(false);
  const [isCalculoFourExecuted, setIsCalculoFourExecuted] = useState(false);
  const [isCalculoFiveExecuted, setIsCalculoFiveExecuted] = useState(false);

  // Funções de Cálculo Abaixo:
  // volume
  const calculosOne = () => {
    let volume =
      (skuQuotationHeight / 1000) *
      (skuQuotationWidth / 1000) *
      (skuQuotationLength / 1000) *
      skuQuotationFactor;

    let better;
    if (volume > skuQuotationWeight) {
      better = `Será utilizado o peso cúbico: ${volume.toFixed(
        2
      )} kg, pois ele é maior que o peso real: ${skuQuotationWeight} kg `;
    } else {
      better = `Será utilizado o peso Real: ${skuQuotationWeight} kg, pois ele é maior que o volor cúbico: ${volume.toFixed(
        2
      )} kg`;
    }

    setSkuQuotationVolumeCalculeted(volume);
    setSkuQuotationBetter(better);
    setIsCalculoOneExecuted(true);

    return;
  };
  // Cálculo do grisFactor
  const calculosTwo = () => {
    let volumeWithoutFactor =
      (skuQuotationHeight / 1000) *
      (skuQuotationWidth / 1000) *
      (skuQuotationLength / 1000) *
      skuQuotationSkuQty;

    // factor =
    //   (row.dimensionalFactor * volume - row.maxWeight) * row.overweightFactor;

    let grisFactor =
      (skuQuotationDimensionFactor * volumeWithoutFactor -
        skuQuotationMaxWeight) *
      skuQuotationOverweightFactor;

    setSkuQuotationGrisFactorCalculated(grisFactor);
    setIsCalculoTwoExecuted(true);

    return;
  };

  // Cálculo do gris&AdValuren
  const calculosThree = () => {
    let grisCalculos =
      (skuQuotationPrice *
        (skuQuotationRowGrisValue + skuQuotationRowAdValorenValue)) /
        100 +
      (skuQuotationRowShhipingCost + skuQuotationGrisFactorCalculated);
    setSkuGrisCalculated(grisCalculos);
    setIsCalculoThreeExecuted(true);

    return;
  };

  const calculosFour = () => {
    // implementation for handling width calculation
    setIsCalculoFourExecuted(true);
  };

  const calculosFive = () => {
    // implementation for handling width calculation
    setIsCalculoFiveExecuted(true);
  };

  const clean = () => {
    setSkuQuotationWeight(0);
    setSkuQuotationHeight(0);
    setSkuQuotationWidth(0);
    setSkuQuotationLength(0);
    setSkuQuotationFactor(0);
    setSkuQuotationVolumeCalculeted(0);
    setSkuQuotationBetter(0);
    setSkuQuotationPrice(0);
    setSkuGrisCalculated(0);
    setSkuQuotationRowGrisValue(0);
    setSkuQuotationRowAdValorenValue(0);
    setSkuQuotationRowShhipingCost(0);
    setErrorMessage(0);
    setSkuQuotationDimensionFactor(0);
    setSkuQuotationMaxWeight(0);
    setSkuQuotationOverweightFactor(0);
    setSkuQuotationGrisFactorCalculated(0);
    setIsCalculoOneExecuted(false);
    setIsCalculoTwoExecuted(false);
    setIsCalculoThreeExecuted(false);
    setIsCalculoFourExecuted(false);
    setIsCalculoFiveExecuted(false);
  };

  return (
    <div>
      <h1 style={{ color: "red" }}>⚠️ 🚧 Under Constrution 🚧 ⚠️</h1>
      <h3>
        Demonstração dos Cálculos da Cotação no OMS - Divido em 5 Partes -
      </h3>
      <h4>
        {" "}
        1 Cálculo do Volume / 2 Cálculo do grisFactor / 3 Cálculo do
        grisAdValoren / 4 ICMS / 5 Cálculo Total{" "}
      </h4>
      <hr />
      <h2>Parte 1 - Cálculo do Volume</h2>
      <hr />
      <h3>Dimensões do Produto:</h3>
      <label type="text">
        Peso em kg
        <input
          placeholder={"10"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationWeight}
          onChange={(event) => {
            if (!isNaN(parseFloat(event.target.value))) {
              setSkuQuotationWeight(parseFloat(event.target.value));
              setErrorMessage("");
            } else {
              setErrorMessage("O valor digitado não é um número válido.");
            }
          }}
        />
      </label>
      <label type="text">
        Altura em mm
        <input
          placeholder={"10"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationHeight}
          onChange={(event) => {
            if (!isNaN(parseFloat(event.target.value))) {
              setSkuQuotationHeight(parseFloat(event.target.value));
              setErrorMessage("");
            } else {
              setErrorMessage("O valor digitado não é um número válido.");
            }
          }}
        />
      </label>
      <label type="text">
        Largura em mm
        <input
          placeholder={"20"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationWidth}
          onChange={(event) => {
            if (!isNaN(parseFloat(event.target.value))) {
              setSkuQuotationWidth(parseFloat(event.target.value));
              setErrorMessage("");
            } else {
              setErrorMessage("O valor digitado não é um número válido.");
            }
          }}
        />
      </label>
      <label type="text">
        Profundidade em mm
        <input
          placeholder={"20"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationLength}
          onChange={(event) => {
            if (!isNaN(parseFloat(event.target.value))) {
              setSkuQuotationLength(parseFloat(event.target.value));
              setErrorMessage("");
            } else {
              setErrorMessage("O valor digitado não é um número válido.");
            }
          }}
        />
      </label>
      <br />
      <label type="text">
        Fator de Cubagem
        <input
          placeholder={"167"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationFactor}
          onChange={(event) => {
            if (!isNaN(parseFloat(event.target.value))) {
              setSkuQuotationFactor(parseFloat(event.target.value));
              setErrorMessage("");
            } else {
              setErrorMessage("O valor digitado não é um número válido.");
            }
          }}
        />
      </label>
      <label type="text">
        Quantidade de SKUs
        <input
          placeholder={"1"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationSkuQty}
          onChange={(event) => {
            if (!isNaN(parseFloat(event.target.value))) {
              setSkuQuotationSkuQty(parseFloat(event.target.value));
              setErrorMessage("");
            } else {
              setErrorMessage("O valor digitado não é um número válido.");
            }
          }}
        />
      </label>
      <h3>Cálculo do Volume</h3>
      <div>
        <span>
          Volume = ( {skuQuotationHeight} / 1000) * ({skuQuotationWidth} / 1000)
          * ({skuQuotationLength} / 1000) * {skuQuotationFactor};<br /> Volume ={" "}
          {skuQuotationVolumeCalculeted}
        </span>
        <br />
        <span>
          Volume/Peso Cúbico {skuQuotationVolumeCalculeted.toFixed(2)} kg{" "}
        </span>
      </div>
      <div>
        <h3>Qual usar? Volume ou Peso Real.</h3>
        {skuQuotationBetter}
        <br />
        <span>***regra padrão do OMS***</span>
        <br />
        <hr />
        <h2> Parte 2 - Cálculo do grisFactor</h2>
        <hr />
        <label type="text">
          Dimension Factor
          <input
            className={styles.card}
            required={true}
            type="number"
            value={skuQuotationDimensionFactor}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                setSkuQuotationDimensionFactor(parseFloat(event.target.value));
                setErrorMessage("");
              } else {
                setErrorMessage("O valor digitado não é um número válido.");
              }
            }}
          />
        </label>
        <label type="text">
          Peso Máximo
          <input
            className={styles.card}
            required={true}
            type="number"
            value={skuQuotationMaxWeight}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                setSkuQuotationMaxWeight(parseFloat(event.target.value));
                setErrorMessage("");
              } else {
                setErrorMessage("O valor digitado não é um número válido.");
              }
            }}
          />
        </label>
        <label type="text">
          Sobre Peso Factor
          <input
            className={styles.card}
            required={true}
            type="number"
            value={skuQuotationOverweightFactor}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                setSkuQuotationOverweightFactor(parseFloat(event.target.value));
                setErrorMessage("");
              } else {
                setErrorMessage("O valor digitado não é um número válido.");
              }
            }}
          />
        </label>
        <br />
        <span></span> <br />
        <h3>Cálculo do grisFactor</h3>
        <div>
          <span>
            grisFactor = ({skuQuotationDimensionFactor} *{" "}
            {skuQuotationVolumeCalculeted} - {skuQuotationMaxWeight}) *{" "}
            {skuQuotationOverweightFactor}; <br /> grisFactor =
            {skuQuotationGrisFactorCalculated}
          </span>
        </div>
        <br />
        <hr />
        <h2> Parte 3 - Cálculo do gris e AdValoren</h2>
        <hr />
        <label type="text">
          Preço de venda do SKU
          <input
            className={styles.card}
            required={true}
            type="number"
            value={skuQuotationPrice}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                setSkuQuotationPrice(parseFloat(event.target.value));
                setErrorMessage("");
              } else {
                setErrorMessage("O valor digitado não é um número válido.");
              }
            }}
          />
        </label>
        <label type="text">
          Constante do Gris
          <input
            className={styles.card}
            required={true}
            type="number"
            value={skuQuotationRowGrisValue}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                setSkuQuotationRowGrisValue(parseFloat(event.target.value));
                setErrorMessage("");
              } else {
                setErrorMessage("O valor digitado não é um número válido.");
              }
            }}
          />
        </label>
        <label type="text">
          Constante do AdValoren
          <input
            className={styles.card}
            required={true}
            type="number"
            value={skuQuotationRowAdValorenValue}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                setSkuQuotationRowAdValorenValue(
                  parseFloat(event.target.value)
                );
                setErrorMessage("");
              } else {
                setErrorMessage("O valor digitado não é um número válido.");
              }
            }}
          />
        </label>
        <br />
        <label type="text">
          Valor da faixa de peso na tabela de frete:
          <input
            className={styles.card}
            required={true}
            type="number"
            value={skuQuotationRowShhipingCost}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                setSkuQuotationRowShhipingCost(parseFloat(event.target.value));
                setErrorMessage("");
              } else {
                setErrorMessage("O valor digitado não é um número válido.");
              }
            }}
          />
        </label>
        <br />
        <h3>Cálculo do Gris:</h3>
        <span>
          gris&adValuren = ({skuQuotationPrice} *({skuQuotationRowGrisValue} +{" "}
          {skuQuotationRowAdValorenValue})) / 100 + (
          {skuQuotationRowShhipingCost} + {skuQuotationGrisFactorCalculated});{" "}
          <br />
          gris&adValuren = {skuGrisCalculated}
        </span>
        <hr />
        <h2>Parte 4 - ICMS</h2>
        <hr />
        <div>Aqui vai o cálculo da parte 4</div>
        <hr />
        <h2>Parte 5 - Cálculo Total</h2>
        <hr />
        <div>Aqui vai o cálculo da parte 5</div>
        <hr />
      </div>
      <button
        className={`${styles.card} ${
          isCalculoOneExecuted ? styles.button_red : styles.button_green
        }`}
        onClick={calculosOne}
      >
        1 - Calcular Volume / Peso Cúbico
      </button>
      <button
        className={`${styles.card} ${
          isCalculoTwoExecuted ? styles.button_red : styles.button_green
        }`}
        onClick={calculosTwo}
      >
        2 - Calcular Fator do Gris{" "}
      </button>
      <button
        className={`${styles.card} ${
          isCalculoThreeExecuted ? styles.button_red : styles.button_green
        }`}
        onClick={calculosThree}
      >
        3 - Calcular Gris e AdValuren
      </button>
      <button
        className={`${styles.card} ${
          isCalculoFourExecuted ? styles.button_red : styles.button_green
        }`}
        onClick={calculosFour}
      >
        4 - Calcular ICMS
      </button>

      <button
        className={`${styles.card} ${
          isCalculoFiveExecuted ? styles.button_red : styles.button_green
        }`}
        onClick={calculosFive}
      >
        5 - Calcular Valor total
      </button>
      <br />
      <button className={styles.card} onClick={clean}>
        Limpar dados
      </button>
    </div>
  );
};

export default Quotation;
