import React, { useState, useEffect, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PaketData({ paketId }) {
  const [paket, setPaket] = useState(null);

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await fetch(
          `https://localhost:44359/api/Paketi/${paketId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setPaket(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaket();
  }, [paketId]);

  if (!paket) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <h2 className="text-center">Detalji paketa</h2>

      <div>
        <p>Posiljalac: {paket.posiljalac}</p>
        <p>Primalac: {paket.primalac}</p>
        <p>Tezina(kg): {paket.tezina}</p>
        <p>Cena: {paket.cenaPostarine}</p>
        <p>Kurir id: {paket.kurirId}</p>
        <p>Ime kurira: {paket.kurirIme}</p>
      </div>
    </Fragment>
  );
}

export default PaketData;
