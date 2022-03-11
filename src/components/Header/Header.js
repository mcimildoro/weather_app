import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../Header/Header.css";
import imagen from "../../components/assests/img/weather-app.png";

function Header() {
  return (
    <AppBar className="header">
      <Toolbar className="container-fluid">
        <img src={imagen} alt="Weather Api"></img>
        <h3 class="vr">Weather App</h3>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
