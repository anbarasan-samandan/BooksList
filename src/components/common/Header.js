import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#f15B2A" };
  const fontSizeStyle = {
    fontSize: "24px",
    color: "#FFC107",
    fontSizeStyle: "bold",
  };
  const pipeStyle = {
    fontSize: "24px",
    fontSizeStyle: "bold",
    color: "#FFBF00",
  };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        <span style={fontSizeStyle}> Home </span>
      </NavLink>
      {"  "}
      <span style={pipeStyle}>{" | "}</span>
      <NavLink to="/books" activeStyle={activeStyle}>
        <span style={fontSizeStyle}> Books </span>
      </NavLink>{" "}
      <span style={pipeStyle}>{" | "}</span>
      <NavLink to="/about" activeStyle={activeStyle}>
        <span style={fontSizeStyle}> About </span>
      </NavLink>
    </nav>
  );
};

export default Header;
