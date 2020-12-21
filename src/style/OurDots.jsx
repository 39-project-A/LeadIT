import styled from "styled-components";
export const DOT = styled.div`
  position: relative;
  color: black;
  text-decoration: none;
  background-color: #f5fffa;
  padding: 0.25em 1em;
  text-align: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  margin-bottom: 15px;
  &::before {
    content: "";
    width: 20px;
    height: 30px;
    position: absolute;
    display: inline-block;
    border-left: solid 1px #5767bf;
    border-top: solid 1px #5767bf;
    top: 0;
    left: 0;
  }
  &::after {
    content: "";
    width: 20px;
    height: 30px;
    position: absolute;
    display: inline-block;
    border-right: solid 1px #5767bf;
    border-bottom: solid 1px #5767bf;
    bottom: 0;
    right: 0;
  }
`;
export const TITLE = styled.p`
  color: gray;
  margin: 0;
  text-align: left;
`;
export const TEXT = styled.p`
  font-size: 1.4em;
  fornt-family: serif;
  margin: 0;
  padding: auto;
`;
export const TIME = styled.p`
  color: gray;
  text-align: right;
  margin: 0;
`;
