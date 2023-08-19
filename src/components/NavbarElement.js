import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

// Colors
const primaryColor = "#63d471";
const secondaryColor = "#808080";

// Create a reusable styled component for shared styles
const StyledNavLink = styled(Link)`
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 14px 16px;
  &:hover {
    background: #fff;
    color: ${secondaryColor};
  }
`;

export const Nav = styled.nav`
  background: ${primaryColor};
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  z-index: 12;
  position: relative;
`;

export const NavLink = styled(StyledNavLink)`
  display: block;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: ${secondaryColor};
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(StyledNavLink)`
  background: ${secondaryColor};
  padding: 10px 22px;
  color: #000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 24px;
  &:hover {
    background: #fff;
  }
`;
