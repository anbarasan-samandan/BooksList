import React from "react";
import { NavLink } from "react-router-dom";
import * as constants from "../common/constants";

const Header = () => {
  return (
    <nav>
      <NavLink to="/" activeStyle={constants.activeStyle} exact>
        <span style={constants.menuFontSizeStyle}> Home </span>
      </NavLink>
      {"  "}
      <span style={constants.menuPipeStyle}>{" | "}</span>
      <NavLink to="/books" activeStyle={constants.activeStyle}>
        <span style={constants.menuFontSizeStyle}> Books </span>
      </NavLink>{" "}
      <span style={constants.menuPipeStyle}>{" | "}</span>
      <NavLink to="/about" activeStyle={constants.activeStyle}>
        <span style={constants.menuFontSizeStyle}> About </span>
      </NavLink>
    </nav>
  );
};

export default Header;
