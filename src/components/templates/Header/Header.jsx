import React from "react";
import HeadProfile from "../icons/components/HeadProfile";
import {
  Nav,
  NavBtn,
  Icon,
  LogoItem,
  HoverText,
  Item_star,
} from "./HeaderElements";
import Achievement from "./Achievement";
import rogo from "../../pages/img/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faClipboard,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
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
          <Link style={items} to="/form">
            <HoverText>
              <FontAwesomeIcon icon={faEdit} />
              <h6 style={{ fontSize: "13px", marginTop: "2px" }}>Form</h6>
            </HoverText>
          </Link>
          <Link style={items} to="/ranking">
            <HoverText>
              <FontAwesomeIcon icon={faCrown} />
              <h6 style={{ fontSize: "13px", marginTop: "2px" }}>Ranking</h6>
            </HoverText>
          </Link>
          <Link style={items} to="/ourdots">
            <HoverText>
              <FontAwesomeIcon icon={faClipboard} />
              <h6 style={{ fontSize: "13px", marginTop: "2px" }}>OurDots</h6>
            </HoverText>
          </Link>
          <Item_star>
            <Achievement />
          </Item_star>
          <Icon>
						<HeadProfile />
					</Icon>
        </LogoItem>
      </Nav>
    </>
  );
}
