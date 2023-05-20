import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPaketi } from "../store/paketi-slice";
function PretragaForm() {
  const [formData, setFormData] = useState({
    najmanje: "",
    najvise: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { najmanje, najvise } = formData;

    try {
      const response = await fetch("https://localhost:44359/api/pretraga", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ najmanje, najvise }),
      });

      if (response.ok) {
        const data = await response.json();
        // Obrada odgovora
        dispatch(searchPaketi(data));
        console.log(data);
        setFormData({
          najmanje: "",
          najvise: "",
        });
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
        <label htmlFor="najmanje" className="form-label">
          Najmanje(kg):
        </label>
        <input
          type="number"
          name="najmanje"
          id="najmanje"
          className="form-control"
          value={formData.najmanje}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="najvise" className="form-label">
          Najvise(kg):
        </label>
        <input
          type="number"
          name="najvise"
          id="najvise"
          className="form-control"
          value={formData.najvise}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default PretragaForm;
