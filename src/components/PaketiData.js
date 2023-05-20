import React, { useState, useEffect, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePaket, searchPaketi } from "../store/paketi-slice";

function PaketiData() {
  const jwtToken = localStorage.getItem("token");

  const dispatch = useDispatch();
  const paketi = useSelector((state) => state.paketi);
  const [searchResults, setSearchResults] = useState([]);

  const fetchPaketi = async () => {
    try {
      const response = await fetch("https://localhost:44359/api/Paketi", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      dispatch(searchPaketi(data));
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPaketi();
  }, []);

  const deleteHandler = async (paketId) => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da izbrišete paket?"
    );
    if (confirmDelete) {
      try {
        await fetch(`https://localhost:44359/api/Paketi/${paketId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        dispatch(deletePaket(paketId));

        fetchPaketi();
        console.log("Paket uspešno obrisan.");
      } catch (error) {
        console.log("Došlo je do greške prilikom brisanja paketa:", error);
      }
    }
  };

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
            {jwtToken ? <th scope="col">Brisanje</th> : ""}
          </tr>
        </thead>
        <tbody>
          {(searchResults.length > 0 ? searchResults : paketi).map((paket) => (
            <tr key={paket.id}>
              <td>{paket.posiljalac}</td>
              <td>{paket.primalac}</td>
              <td>{paket.tezina}</td>
              <td>{paket.cenaPostarine}</td>
              {jwtToken ? (
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteHandler(paket.id)}
                  >
                    Obriši
                  </button>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default PaketiData;
