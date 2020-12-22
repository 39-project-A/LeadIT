import styled from "styled-components";

export const Nav = styled.nav`
  background: #00daff;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 24px;
  :hover {
    color: #008b8b;
    cursor: pointer;
    transform: scale(1.1);
    transition-duration: 0.7s;
  }
`;

export const Icon = styled.i`
  background-size: 5px;
  padding-top: 5px;
`;

export const LogoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 200px 30px;
`;

export const HoverText = styled.p`
  margin-right: 50px;
  text-align: center;
  color: "white";
  :hover {
    color: #008b8b;
    cursor: pointer;
    transform: scale(0.9);
    transition-duration: 0.7s;
  }
`;

export const Item_star = styled.div`
  padding-top: 4px;
  margin-right: 50px;
`;

export const UserIcon = styled.i`
  background-size: 5px;
  padding-top: 5px;
`;
