import { useState } from "react";
import Kuriri from "./Kuriri";
import { useDispatch } from "react-redux";
import { addPaket } from "../store/paketi-slice";
import { useNavigate } from "react-router-dom";

function PaketiForm(props) {
  const navigate = useNavigate();
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

    if (formData.Posiljalac.length <= 2 || formData.Posiljalac.length > 90) {
      window.alert("Posiljalac mora biti dužine od 2 do 90 karaktera.");
      return;
    }

    // Validacija primaoca
    if (formData.Primalac.length <= 2 || formData.Primalac.length > 90) {
      window.alert("Primalac mora biti dužine od 2 do 90 karaktera.");
      return;
    }

    // Validacija težine
    if (formData.Tezina < 0.1 || formData.Tezina > 9.99) {
      window.alert("Težina mora biti između 0.1 i 9.99.");
      return;
    }

    // Validacija cene
    if (formData.CenaPostarine < 250 || formData.CenaPostarine > 10000) {
      window.alert("Cena mora biti između 250 i 10000.");
      return;
    }

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
        window.alert("Paket uspešno dodat.");
        navigate("../paketiData");
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
          required
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
          required
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
          required
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
          required
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
