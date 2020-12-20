import styled from "styled-components";

export const LeftItem = styled.div`
  position: absolute;
  height: 100vh;
  width: 10%;
  transform: translate(230px, 30px);
  /* margin-top: 10px; */
`;

export const StyledDots = styled.div`
  position: absolute;
  width: 110%;
  height: 45%;
  top: 186px;
  left: 10px;
  overflow: auto;
`;

export const Profile = styled.div`
  /* height: 50%; */
`;

export const StyledChart = styled.div`
  position: absolute;
  transform: translate(436px, 30px);
`;

export const StyledForm = styled.div`
  position: absolute;
  transform: translate(230px, -10px);
  margin-top: 10px;
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

export const WeekStudyHours = styled.ul`
  position: absolute;
  top: 460px;
  right: 50px;
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
  margin-bottom: 15px;
  line-height: 1.5;
  padding: 0.5em;
  border-bottom: solid 2px #dadada;
  list-style-type: none;
`;
