import React from "react";
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BUFFER = Dimensions.get("window").width * 0.4;


const useStyles = makeStyles((theme) => ({
  root: {
    width: SCREEN_WIDTH - BUFFER
  },
  heading: {
    fontSize: theme.typography.pxToRem(30)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(25),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#5b06d5'
    }
  },
  typography: {
    body1: {
      fontSize: 20,
    }
}
});

const ViewCard = ({
  _id,
  title, 
  description,
  location,
  startDate,
  endDate,
  guests,
  attendees,
  tag
}) => {
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userid = ud.id;
  var userName = ud.username;
  var liked = ud.likes;
  var attending = ud.attend;

  function removeLike(_id){
    liked.splice(liked.indexOf(_id), 1);
    axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
      id: userid, 
      LikedEvents: liked
    })
    .then((response) => {
      var UserData = {firstName:response.data.FirstName, lastName:response.data.LastName, username:response.data.UserName, 
        id:userid, tags: response.data.Tags, emailAddress: response.data.Email, likes: response.data.LikedEvents, 
        attend: response.data.AttendingEvents}
      localStorage.setItem('user_data', JSON.stringify(UserData));
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  function nowAttend(_id, attendees){
    liked.splice(liked.indexOf(_id), 1);
    attending.push(_id);
    axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
      id: userid, 
      LikedEvents: liked,
      AttendingEvents: attending
    })
    .then((response) => {
      var UserData = {firstName:response.data.FirstName, lastName:response.data.LastName, username:response.data.UserName, 
        id:userid, tags: response.data.Tags, emailAddress: response.data.Email, likes: response.data.LikedEvents, 
        attend: response.data.AttendingEvents}
      localStorage.setItem('user_data', JSON.stringify(UserData));
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    attendees.push(userName);
    axios.patch('https://togethrgroup1.herokuapp.com/api/editevent', {
      id: _id, 
      Attendees: attendees
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }


  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {description}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <Typography variant="body1" gutterBottom>
          When: {startDate.substring(0,15)}{startDate.substring(18,22)} to {endDate.substring(0,15)}{endDate.substring(18,22)} <br/>
          Where:  {location} <br/>
          {attendees.length}/{guests +1} Attendees: {attendees}
        </Typography>
        </AccordionDetails>

        <Divider />
        <AccordionActions>
          <Button onClick = {() => removeLike(_id)} size="small">Remove</Button>
          <Button onClick = {() => nowAttend(_id, attendees)}size="small" color="secondary">
            Attend
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
    </MuiThemeProvider>
  );
}


export default ViewCard;
