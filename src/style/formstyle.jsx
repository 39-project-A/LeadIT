import styled from "styled-components";
export const BODY = styled.div`
  font-family: verdana;
`;
export const CONTAINER = styled.section`
  max-width: 40%;
  min-width: 30%;
  margin: 0 auto;
  margin-top: 2em;
`;
export const TITLE = styled.h1`
  display: block;
  text-align: center;
  background: #f1773b;
  color: white;
  margin: 0;
  padding: 0.75em 0;
  font-weight: normal;
  border-radius: 10px 10px 0 0;
`;
export const FORM = styled.form`
  border-radius: 0 0 5px 5px;
  border: 1px solid #ccc;
  border-top: none;
  background: #fff;
`;
export const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
export const LI = styled.li`
  position: relative;
`;
export const LABEL = styled.label`
  display: block;
  width: 100%;
  font-size: 0.8125em;
  position: absolute;
  top: 1.6em;
  color: #f1773b;
  opacity: 1;
  border-bottom: 1px solid #ff7f50;
`;
export const TEXTLABEL = styled.label`
  display: block;
  width: 100%;
  font-size: 0.8125em;
  position: absolute;
  top: -1.6em;
  color: #f1773b;
  opacity: 1;
  border-bottom: 1px solid #ff7f50;
`;
export const SUBMIT = styled.input`
  display: block;
  background: #f1773b;
  padding: 1em;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  padding: 1em 1em 1em;
  font-size: 1.2em;
`;
export const INPUT = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  padding: 2.25em 1em 1em;
  font-size: 1.2em;
`;
export const SELECT = styled.select`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  padding: 2.25em 1em 1em;
  font-size: 1.2em;
`;
export const TEXTAREA = styled.textarea`
  margin-top: 1em;
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  padding: 0em 1em 1em;
  font-size: 1.2em;
  height: 16em;
  resize: none;
  font-size: 1.2em;
  font-family: verdana;
  padding-left: 0.85em;
`;
export const TAGS = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  padding: 2.25em 1em 1em;
  font-size: 1.2em;
`;
export const ERR = styled.span`
  color: red;
  font-size: 13px;
`;
export const ALRADY = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: 200px;
  padding: 2.5em;
  background: -moz-linear-gradient(#ffb03c, #ff708d);
  background: -webkit-linear-gradient(#ffb03c, #ff708d);
  background: linear-gradient(to right, #ffb03c, #ff708d);
  color: #fff;
`;
export const TY = styled.p`
  font-size: 70px;
`;
