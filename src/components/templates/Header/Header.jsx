import React from "react";
import HeadProfile from "../icons/components/HeadProfile";
import { Nav, NavLink, NavBtn, NavBtnLink, Icon } from "./HeaderElements";
import Achievement from "./Achievement";
import rogo from "../../pages/img/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faClipboard } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const items = {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    padding: "10px",
    textAlin: "center",
    transition: "all 0.2s",
    marginTop: "3px",
    "&:hover": {
      background: "#f00",
    },
  };

  return (
    <>
      <Nav>
        <Link to="/">
          <NavBtn>
            <img
              src={rogo}
              alt="logo"
              style={{ height: "50px", width: "249px", marginTop: "10px" }}
            />
          </NavBtn>
        </Link>

        <LogoItem>
          <Link style={items} to="/ranking">
            {" "}
            <HoverText>
              <FontAwesomeIcon icon={faCrown} />
              <h6 style={{ fontSize: "13px", marginTop: "2px" }}>Ranking</h6>
            </HoverText>
          </Link>
          <Link style={items} to="/ourdots">
            {" "}
            <HoverText>
              <FontAwesomeIcon icon={faClipboard} />
              <h6 style={{ fontSize: "13px", marginTop: "2px" }}>OurDots</h6>
            </HoverText>
          </Link>
          <ItemTop>
            <Achievement />
          </ItemTop>
          <Icon>
            <UserIcon />
          </Icon>
        </LogoItem>
      </Nav>
    </>
  );
};

export default Header;
