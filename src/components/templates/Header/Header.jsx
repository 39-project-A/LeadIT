import React from "react";
import UserIcon from "../icons/user/user";
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
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
        <Achievement />
        <Icon>
          <UserIcon />
        </Icon>
      </Nav>
    </>
  );
};

export default Header;
