import React, { useState, useEffect } from "react";

const api =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const Cryptos = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setLoading(false);
      setCryptocurrencies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Crypto-Viewer</h1>
      <p>(Expresed in USD)</p>
      {loading && <h1>Loading...</h1>}
      <ul className="cryptocurrency__container">
        {cryptocurrencies.map((currency) => (
          <li key={currency.market_cap_rank} className="cryptocurrency">
            <figure className="cryptocurrency__img">
              <img src={currency.image} alt={"Logo of " + currency.name} />
            </figure>
            <div className="cryptocurrency__name">
              <h2>
                {currency.symbol.toUpperCase()}:{" "}
                {new Intl.NumberFormat("es-US", {
                  style: "currency",
                  currency: "USD",
                  useGrouping: true,
                }).format(currency.current_price)}
              </h2>
              <p className="cryptocurrency__info">
                24h/Low:{" "}
                {new Intl.NumberFormat("es-US", {
                  style: "currency",
                  currency: "USD",
                  useGrouping: true,
                }).format(currency.low_24h)}
              </p>
              <p className="cryptocurrency__info">
                24h/High:{" "}
                {new Intl.NumberFormat("es-US", {
                  style: "currency",
                  currency: "USD",
                  useGrouping: true,
                }).format(currency.high_24h)}
              </p>
              <p className="cryptocurrency__info">
                Market Cap:{" "}
                {new Intl.NumberFormat("es-US", {
                  style: "currency",
                  currency: "USD",
                  useGrouping: true,
                }).format(currency.market_cap)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
