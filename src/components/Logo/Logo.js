import React from "react";
import burgerlogo from "../assets/images/burger-logo.png";
import "./Logo.css";
const logo = (props) => (
  <div className="Logo">
    <img src={burgerlogo} alt="logo" />
  </div>
);
export default logo;
