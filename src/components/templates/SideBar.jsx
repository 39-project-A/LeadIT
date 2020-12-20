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

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faGlobe} />
          </ListItemIcon>
          <ListItemText primary="ALL" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHtml5} />
          </ListItemIcon>
          <ListItemText primary="HTML5" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCss3} />
          </ListItemIcon>
          <ListItemText primary="CSS3" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faJs} />
          </ListItemIcon>
          <ListItemText primary="JavaScript" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faReact} />
          </ListItemIcon>
          <ListItemText primary="React" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faVuejs} />
          </ListItemIcon>
          <ListItemText primary="Vue" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faAngular} />
          </ListItemIcon>
          <ListItemText primary="Angular" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPhp} />
          </ListItemIcon>
          <ListItemText primary="PHP" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faLaravel} />
          </ListItemIcon>
          <ListItemText primary="Laravel" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPython} />
          </ListItemIcon>
          <ListItemText primary="Python" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faJava} />
          </ListItemIcon>
          <ListItemText primary="Java" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faSwift} />
          </ListItemIcon>
          <ListItemText primary="Swift" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faGit} />
          </ListItemIcon>
          <ListItemText primary="Git" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon={faGithub} />
          </ListItemIcon>
          <ListItemText primary="Github" />
        </ListItem>
        <Divider />
        <ListItem button>
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
