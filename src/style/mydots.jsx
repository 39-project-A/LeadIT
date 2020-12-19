import styled from "styled-components";

export const StyledChart = styled.div`
  position: absolute;
  transform: translate(520px, 10px);
`;

export const StyledForm = styled.div`
  position: absolute;
  /* bottom: 200px; */
  transform: translate(150px, -10px);
  margin-top: 10px;
`;
export const Profile = styled.div`
  position: absolute;
  transform: translate(250px, 30px);
  margin-top: 50px;
  /* padding: 0 10rem; */
  /* width: 50%; */
  /* height: 50%; */
`;

export const WeekStudyHours = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px auto;
  padding: 0 0 0 0 !important;
`;

export const StudyHours = styled.li`
  color: #2d8fdd;
  border-left: solid 6px #f4b364; /*左側の線の色を変えたい場合はここ*/
  background: #fdf2e3; /*背景色を変えたい場合はここ*/
  margin-bottom: 5px;
  line-height: 1.5;
  padding: 0.5em;
  border-bottom: solid 2px #dadada;
  list-style-type: none;
`;

export const StyledCalendar = styled.div`
  margin-right: 3rem;
`;

export const ExplainCalendar = styled.div`
  position: relative;
  padding: 20px;
  background-color: #b3e5fc;
  margin-top: 2rem;
  margin-bottom: 6em;
  /* margin-right: 12em; */
  ::before {
    content: "";
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    left: -15px;
    top: 20px;
    border-right: 15px solid #b3e5fc;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
`;

export const CalendarText = styled.p`
  margin: 0;
  padding: 0;
`;

export const StyledDots = styled.div`
  position: absolute;
  height: 50%;
  width: 15%;
  bottom: 0;
  right: 0;
  /* transform: translate(-150px, -150px); */
  overflow: auto;
`;
