import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function OurSideBar({ dots, sortDots, set_sortDots }) {
  const classes = useStyles();
  const sort_dots = (tag) => {
    set_sortDots(
      sortDots.filter((dot) => {
        if (dot.tags.indexOf(tag) !== -1) return dot;
      })
    );
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={() => set_sortDots(dots)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faGlobe} />
          </ListItemIcon>
          <ListItemText primary="ALL" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("HTML5")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHtml5} />
          </ListItemIcon>
          <ListItemText primary="HTML5" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("CSS3")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCss3} />
          </ListItemIcon>
          <ListItemText primary="CSS3" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("JavaScript")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faJs} />
          </ListItemIcon>
          <ListItemText primary="JavaScript" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("React")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faReact} />
          </ListItemIcon>
          <ListItemText primary="React" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Vue")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faVuejs} />
          </ListItemIcon>
          <ListItemText primary="Vue" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Angular")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faAngular} />
          </ListItemIcon>
          <ListItemText primary="Angular" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("PHP")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPhp} />
          </ListItemIcon>
          <ListItemText primary="PHP" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Laravel")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faLaravel} />
          </ListItemIcon>
          <ListItemText primary="Laravel" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Python")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPython} />
          </ListItemIcon>
          <ListItemText primary="Python" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Java")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faJava} />
          </ListItemIcon>
          <ListItemText primary="Java" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Swift")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faSwift} />
          </ListItemIcon>
          <ListItemText primary="Swift" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Git")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faGit} />
          </ListItemIcon>
          <ListItemText primary="Git" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Github")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faGithub} />
          </ListItemIcon>
          <ListItemText primary="Github" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => sort_dots("Docker")}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faDocker} />
          </ListItemIcon>
          <ListItemText primary="Docker" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}
