import styled from "styled-components";

export const Base_wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
`;

export const Signout = styled.p`
  font-size: 15px;
  font-weight: bold;
  :hover {
    color: #ca1c81;
    cursor: pointer;
    transform: scale(0.9);
    transition-duration: 0.7s;
  }
`;

export const Profile = styled.div`
  position: absolute;
  height: 100%;
  width: 12%;
  top: 120px;
  left: 220px;
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
  width: 15%;
  top: 365px;
  left: 193px;
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
  width: 50vw;
  height: 50vh;
`;

export const RightItem = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledCalendar = styled.div`
  /* margin-right: 3rem; */
  /* position: absolute;
  right: -20px;
  top: 112px; */
`;

export const ExplainCa = styled.p`
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

export const Mydots = styled.p`
  font-size: 20px;
  font-family: cursive;
  font-weight: bold;
  position: absolute;
  top: 421px;
  right: 107px;
`;

export const StyledDots = styled.div`
  position: absolute;
  width: 15.5%;
  height: 28%;
  top: 450px;
  right: 30px;
  overflow: auto;
`;
