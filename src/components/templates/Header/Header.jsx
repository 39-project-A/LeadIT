import React from "react";
import HeadProfile from "../icons/components/HeadProfile";
import { Nav, NavLink, NavBtn, NavBtnLink, Icon } from "./HeaderElements";
import Achievement from "./Achievement";

const Header = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>LeadIT</h1>
        </NavLink>
        <NavBtn>
          <NavBtnLink to="/ranking">Ranking</NavBtnLink>
        </NavBtn>
        <Achievement />
        <Icon>
          <HeadProfile />
        </Icon>
      </Nav>
    </>
  );
};

export default Header;
