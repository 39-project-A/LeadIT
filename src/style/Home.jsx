import styled from "styled-components";

export const Header = styled.header`
  background-color: #05c5f3;
  height: 10vh;
  color: white;
`;

export const HeaderTitle = styled.h1`
  font-size: 50px;
  padding: 15px 100px 0;
`;

export const Img = styled.img`
  position: relative;
  width: 100vw;
  height: 80vh;
`;

export const Explain = styled.div`
  position: absolute;
  top: 345px;
  left: 130px;
  width: 80vw;
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

export const Footer = styled.footer`
  background-color: #05c5f3;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 10vh;
`;
