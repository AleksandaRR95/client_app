import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function PaketiData() {
  const [paketi, setPaketi] = useState([]);

  useEffect(() => {
    const fetchPaketi = async () => {
      try {
        const response = await axios.get("https://localhost:44359/api/Paketi");
        setPaketi(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaketi();
  }, [paketi]);

  return (
    <Fragment>
      <h2 className="text-center">Paketi</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Posiljalac</th>
            <th scope="col">Primalac</th>
            <th scope="col">Tezina(kg)</th>
            <th scope="col">Cena</th>
          </tr>
        </thead>
        <tbody>
          {paketi.map((paket) => (
            <tr key={paket.id}>
              <td>{paket.posiljalac}</td>
              <td>{paket.primalac}</td>
              <td>{paket.tezina}</td>
              <td>{paket.cenaPostarine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default PaketiData;
