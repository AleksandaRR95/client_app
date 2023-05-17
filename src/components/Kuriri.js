import React, { useState, useEffect } from "react";

function Kuriri(props) {
  const [kuriri, setKuriri] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44359/api/Kuriri")
      .then((response) => response.json())
      .then((data) => setKuriri(data));
  }, []);

  const handleKurirChange = (event) => {
    props.onKurirChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="kurirId">Izaberi kurira: </label>
      <select
        id="kurirId"
        className="form-select"
        name="kurirId"
        onChange={handleKurirChange}
      >
        {/* Mapiranje rezultata fetch-ovanja na <option> elemente */}
        {kuriri.map((kurir) => (
          <option key={kurir.id} value={kurir.id}>
            {kurir.ime}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Kuriri;
