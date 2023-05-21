import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { login, register} from "../store/auth-slice";
import { useNavigate } from "react-router-dom";
function AuthForm() {
  var loginEndpoint = "https://localhost:44359/api/authentication/login";
  var registerEndpoint = "https://localhost:44359/api/authentication/register";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let endpoint = isRegistered ? loginEndpoint : registerEndpoint;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.alert('Uspesna prijava na sistem.')
        if (isRegistered) {
          // Prijavljivanje uspešno
          localStorage.setItem("token", data.token);
          dispatch(login(data.token));
          //Redirekcija
          navigate("/");
        } else {
          
          dispatch(register(data.token)); 
          
          
        }
      } else {
        console.log(
          `Došlo je do greške pri ${
            isRegistered ? "prijavljivanju" : "registraciji"
          }.`
        );
      }
    } catch (error) {
      console.log("Došlo je do greške:", error);
    }
  };
/*  const handleLogout = () => {
    localStorage.removeItem("token"); // Uklonite token iz lokalnog skladišta prilikom odjave
    dispatch(logout()); // Dispečujte akciju za odjavu
    // Dodajte logiku za preusmeravanje na početnu stranicu ili drugu odgovarajuću akciju
  };  */
  return (
    <Fragment>
      <form onSubmit={handleFormSubmit}>
        <h2>{isRegistered ? "Prijava" : "Registracija"}</h2>
        {!isRegistered && (
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              className="form-control"
              value={formData.Email}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="Username" className="form-label">
            Korisničko ime:
          </label>
          <input
            type="text"
            id="Username"
            name="Username"
            className="form-control"
            value={formData.Username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Lozinka:
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            className="form-control"
            value={formData.Password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isRegistered ? "Prijavi se" : "Registruj se"}
        </button>
        <p>
          {isRegistered
            ? "Nemate nalog? Registrujte se."
            : "Već imate nalog? Prijavitese."}
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {isRegistered ? "Registracija" : "Prijava"}
          </button>
        </p>
      </form>
    </Fragment>
  );
}

export default AuthForm;
