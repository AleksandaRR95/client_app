import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Kurirska sluzba
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Pocetna strana
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/paketiData" className="nav-link">
                Paketi
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dodajPaket" className="nav-link">
                Dodaj paket
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/auth" className="nav-link">
                Registracija / Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;