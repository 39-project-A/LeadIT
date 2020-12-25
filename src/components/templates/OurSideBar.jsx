import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faVuejs } from "@fortawesome/free-brands-svg-icons";
import { faAngular } from "@fortawesome/free-brands-svg-icons";
import { faPhp } from "@fortawesome/free-brands-svg-icons";
import { faLaravel } from "@fortawesome/free-brands-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faGit } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faJava } from "@fortawesome/free-brands-svg-icons";
import { faSwift } from "@fortawesome/free-brands-svg-icons";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faCss3 } from "@fortawesome/free-brands-svg-icons";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TAGLISTS = styled(ListItem)`
  height: 5vh;
`;
export default function OurSideBar({ dots, sortDots, set_sortDots }) {
  const sort_dots = (tag) => {
    set_sortDots(
      dots.filter((dot) => {
        if (dot.tags.indexOf(tag) !== -1) return dot;
      })
    );
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      <TAGLISTS button onClick={() => set_sortDots(dots)}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faGlobe} />
        </ListItemIcon>
        <ListItemText primary="ALL" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("HTML5")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faHtml5} />
        </ListItemIcon>
        <ListItemText primary="HTML5" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("CSS3")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faCss3} />
        </ListItemIcon>
        <ListItemText primary="CSS3" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("JavaScript")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faJs} />
        </ListItemIcon>
        <ListItemText primary="JavaScript" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("React")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faReact} />
        </ListItemIcon>
        <ListItemText primary="React" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Vue")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faVuejs} />
        </ListItemIcon>
        <ListItemText primary="Vue" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Angular")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faAngular} />
        </ListItemIcon>
        <ListItemText primary="Angular" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("PHP")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faPhp} />
        </ListItemIcon>
        <ListItemText primary="PHP" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Laravel")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faLaravel} />
        </ListItemIcon>
        <ListItemText primary="Laravel" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Python")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faPython} />
        </ListItemIcon>
        <ListItemText primary="Python" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Java")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faJava} />
        </ListItemIcon>
        <ListItemText primary="Java" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Swift")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faSwift} />
        </ListItemIcon>
        <ListItemText primary="Swift" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Git")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faGit} />
        </ListItemIcon>
        <ListItemText primary="Git" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Github")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faGithub} />
        </ListItemIcon>
        <ListItemText primary="Github" />
      </TAGLISTS>
      <Divider />
      <TAGLISTS button onClick={() => sort_dots("Docker")}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faDocker} />
        </ListItemIcon>
        <ListItemText primary="Docker" />
      </TAGLISTS>
      <Divider />
    </List>
  );
}
