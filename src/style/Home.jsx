import styled from "styled-components";

export const Img = styled.img`
  position: relative;
  flex: 1;
  width: 100vw;
  height: 85vh;
`;

export const Explain = styled.div`
  position: absolute;
  top: 345px;
  left: 320px;
  width: 60vw;
  padding: 0.5em 0;
  margin: 0 auto;
  background: #f0f7ff;
  border: dashed 3px #5b8bd0;
`;

export const TextTilte = styled.p`
  text-align: center;
  font-size: 2rem;
`;

export const AboutLeadIT = styled.p`
  line-height: 30px;
`;

export const ButtonArea = styled.div`
  position: relative;
`;

export const Button = styled.a`
  position: absolute;
  top: -150px;
  left: 800px;
  color: #fff;
  background-color: #05c5f3;
  border-radius: 50%;
  line-height: 100px;
  width: 100px;
  height: 100px;
  padding: 0;
  box-shadow: 0 5px 0 gray;
  outline: none;
  :hover {
    transition: 0.8s;
    color: black;
    background-color: yellow;
    -webkit-transform: translate(0, 3px);
    transform: translate(0, 3px);
    box-shadow: 0 2px 0 black;
    outline: none;
    text-decoration: none;
  }
`;

export const ButtonText = styled.p`
  padding-left: 5px;
`;

export const Footer = styled.footer`
  background-color: #05c5f3;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 9vh;
`;
