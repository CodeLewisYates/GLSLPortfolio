import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Box } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import emailjs, { init } from "emailjs-com";
init("user_buJZhH5UUKUodXfcoDtPG");

const useStyles = makeStyles((theme) => ({
  form: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    width: "max-content",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "3rem 2rem",
    borderRadius: "10px",
  },
  heading: {
    color: "#f0f5f9",
    textAlign: "center",
    marginBottom: "1rem",
    fontFamily: "Raleway",
  },
  button: {
    marginTop: "1rem",
    color: "#f0f5f9",
    backgroundColor: "#ff005c",
    borderColor: "#ff005c",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#ffa41c",
    },
    "& label": {
      color: "#f0f5f9",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ff005c",
      },
      "&:hover fieldset": {
        borderColor: "#ff005c",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff005c",
      },
    },
  },
})(TextField);

const Contact = () => {
  const submitMessage = async () => {
    const message = document.getElementById("message").value;
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const button = document.getElementById("submitMessage");

    const templateParams = {
      to_name: "Lewis",
      from_name: name,
      from_emailAddress: email,
      message: message,
    };
    button.textContent = "Sending Message...";
    const response = await emailjs.send(
      "service_coj5ilt",
      "template_ye5dvbc",
      templateParams
    );
    if (response.text === "OK") {
      button.textContent = "Message sent!";
      button.style.backgroundColor = "#70AE6E";
    } else {
      button.textContent = "Failed to send!";
      button.style.backgroundColor = "#AD2831";
    }
    setTimeout(() => {
      button.textContent = "Send Message";
      button.style.backgroundColor = "#3282b8";
    }, 2000);
  };

  const classes = useStyles();
  return (
    <Box component="div" className={classes.container}>
      <Grid container justify="center">
        <Box component="form" className={classes.form}>
          <Typography variant="h3" className={classes.heading}>
            Contact me!
          </Typography>
          <InputField
            fullWidth={true}
            label="Name"
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "#f0f5f9" } }}
            id="name"
          />
          <br />
          <InputField
            fullWidth={true}
            label="Email"
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "#f0f5f9" } }}
            id="email"
          />
          <br />
          <InputField
            fullWidth={true}
            label="Message"
            variant="outlined"
            margin="dense"
            size="medium"
            multiline={true}
            inputProps={{ style: { color: "#f0f5f9", minHeight: "100px" } }}
            id="message"
          />
          <Button
            variant="outlined"
            fullWidth={true}
            endIcon={<SendIcon />}
            className={classes.button}
            onClick={submitMessage}
            id="submitMessage"
          >
            Send Message
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Contact;
