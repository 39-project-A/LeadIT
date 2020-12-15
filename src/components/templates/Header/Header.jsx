import React from "react";
import UserIcon from "../icons/user/user";
import { Nav, NavLink, NavBtn, NavBtnLink, Icon, Logo } from "./HeaderElements";
import Achievement from "./Achievement";
import rogo from "../../pages/img/rogo.png"
import { Link } from 'react-router-dom'
import WhatshotIcon from '@material-ui/icons/Whatshot';

const Header = () => {
  return (
    <>
      <Logo><Link to="/home"><img src={rogo} alt="logo" style={{ height: "80px", width:"400px"}}/></Link></Logo>
      <Nav>
        
        <NavBtn>
          <NavBtnLink to="/ranking">Ranking</NavBtnLink>
        </NavBtn>
        <WhatshotIcon className={classes.icon} />
        <Achievement />
        <Icon>
          <UserIcon />
        </Icon>
      </Nav>
    </>
  );
};

export default Header;
