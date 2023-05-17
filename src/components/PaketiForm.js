import { useState } from "react";
import Kuriri from "./Kuriri";
import { useDispatch } from "react-redux";
import { addPaket } from "../store/paketi-slice";

function PaketiForm(props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Posiljalac: "",
    Primalac: "",
    Tezina: "",
    CenaPostarine: "",
    KurirId: 0,
  });

  const [selectedKurirId, setSelectedKurirId] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "KurirId") {
      setSelectedKurirId(value);
      setFormData({
        ...formData,
        KurirId: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      KurirId: selectedKurirId,
    };

    try {
      const response = await fetch("https://localhost:44359/api/Paketi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(updatedFormData),
      });
      console.log(updatedFormData);
      if (response.ok) {
        const data = await response.json();
        dispatch(addPaket(data));
        // Resetovanje forme
        setFormData({
          Posiljalac: "",
          Primalac: "",
          Tezina: "",
          CenaPostarine: "",
          KurirId: 0,
        });
        console.log("Paket uspešno dodat.");
      } else {
        console.log("Došlo je do greške prilikom slanja zahteva.");
      }
    } catch (error) {
      console.log("Došlo je do greške:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <h2>Dodavanje novog paketa</h2>

        <label htmlFor="Posiljalac" className="form-label">
          Posiljalac:
        </label>
        <input
          type="text"
          name="Posiljalac"
          id="Posiljalac"
          className="form-control"
          value={formData.Posiljalac}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Primalac" className="form-label">
          Primalac:
        </label>
        <input
          type="text"
          name="Primalac"
          id="Primalac"
          className="form-control"
          value={formData.Primalac}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Tezina" className="form-label">
          Tezina paketa(kg):
        </label>
        <input
          type="number"
          name="Tezina"
          id="Tezina"
          className="form-control"
          value={formData.Tezina}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="CenaPostarine" className="form-label">
          Cena:
        </label>
        <input
          type="number"
          name="CenaPostarine"
          id="CenaPostarine"
          className="form-control"
          value={formData.CenaPostarine}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        {/*   <label htmlFor="kurirId" className="form-label">
          Kurir:
        </label> */}
        <Kuriri
          onChange={handleInputChange}
          onKurirChange={setSelectedKurirId}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default PaketiForm;
