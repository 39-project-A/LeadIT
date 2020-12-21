import styled from "styled-components";

export const LeftItem = styled.div`
  position: absolute;
  height: 100vh;
  width: 20%;
  top: 95px;
  transform: translate(230px, 30px);
  /* margin-top: 10px; */
`;

export const Profile = styled.div`
  position: relative;
  width: 58%;
  height: 100%;
  right: 13px;
`;

export const UserName = styled.p`
  /* position: absolute; */
  font-family: cursive;
  text-align: center;
  /* margin-left: 10px; */
  font-size: 25px;
  font-weight: bold;
`;
export const WeekStudyHours = styled.ul`
  position: absolute;
  width: 75%;
  top: 240px;
  right: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px auto;
  padding: 0 0 0 0 !important;
`;

export const StudyHours = styled.li`
  font-weight: bold;
  color: #2d8fdd;
  border-left: solid 6px #f4b364; /*左側の線の色を変えたい場合はここ*/
  background: #fdf2e3; /*背景色を変えたい場合はここ*/
  margin-bottom: 25px;
  line-height: 1.5;
  padding: 0.5em;
  border-bottom: solid 2px #dadada;
  list-style-type: none;
`;

export const StyledChart = styled.div`
  position: absolute;
  transform: translate(436px, 30px);
`;

export const StyledCalendar = styled.div`
  margin-right: 3rem;
  position: absolute;
  right: -20px;
  top: 112px;
`;

export const ExplainCa = styled.p`
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

export const StyledDots = styled.div`
  position: absolute;
  width: 15.5%;
  height: 28%;
  top: 395px;
  right: 30px;
  overflow: auto;
`;
