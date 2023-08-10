import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from "./NavbarElement";

const Navigation = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/about" activeStyle>
            Home
          </NavLink>
          <NavLink to="/home" activeStyle>
            About
          </NavLink>
          <NavLink to="/events" activeStyle>
            Events
          </NavLink>
          <NavLink to="/news" activeStyle>
            News
          </NavLink>
          <NavLink to="/team" activeStyle>
            Teams
          </NavLink>
          
        </NavMenu>
       
      </Nav>
    </>
  );
};

export default Navigation;
