import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";


export const Nav = styled.nav`
background:#00DAFF;
width: 100%;
height: 64px;
display: flex;
justify-content: space-between;
  text-align:center;
  &.box-shadow{0px 9px 3px -3px rgba(0,0,0,0.6);
  -webkit-box-shadow: 0px 9px 3px -3px rgba(0,0,0,0.6);
  -moz-box-shadow: 0px 9px 3px -3px rgba(0,0,0,0.6);
  }
`;

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  
  &.active {
    color: black;
  }
  `;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 24px;
  	:hover {
		color:#008b8b;
    cursor: pointer;
   transform: scale(1.1);
    transition-duration: 0.7s;
  `;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
  `;

export const Icon = styled.i`
  background-size: 5px;
padding-top:5px;
  `;

export const Bodyleft = styled.div`
float: right;
`;

export const LogoItem = styled.div`
  display: flex;
justify-content: space-between;
 margin: 0px 20px 30px; 
`
export const ItemTop = styled.div`
 padding-top:4px;
`;
export const HoverText = styled.p`
isplay: flex;
justify-content: space-between;
  text-align:center;
  color: 'white';
	:hover {
		color:#008b8b;
    cursor: pointer;
   transform: scale(0.9);
    transition-duration: 0.7s;
	}
`