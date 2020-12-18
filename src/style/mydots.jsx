import styled from "styled-components";

export const LeftPage = styled.div`
  position: absolute;
  /* padding: 0 10rem; */
  width: 40%;
  height: 80%;
  left: 10rem;
  border: solid 10px #a1e8d7;
`;

export const Profile = styled.div`
  /* padding: 0 10rem; */
  /* width: 50%; */
  /* height: 50%; */
`;

export const WeekStudyHours = styled.div`
  position: relative;
  margin: 5rem 10rem;
  padding: 5rem 1em;
  border: solid 3px #95ccff;
  border-radius: 8px;
`;

export const WeekTitle = styled.span`
  position: absolute;
  display: inline-block;
  top: -13px;
  left: 10px;
  padding: 0 9px;
  line-height: 1;
  font-size: 19px;
  background: #fff;
  color: #95ccff;
  font-weight: bold;
`;

export const StudyHours = styled.p`
  margin: 0;
  padding: 0;
`;

export const RightPage = styled.div`
  position: absolute;
  width: 45%;
  right: 1rem;
`;

export const RightTop = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-right: 12em;
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

export const StyledChart = styled.div`
  /* padding: 0 10rem; */
`;
