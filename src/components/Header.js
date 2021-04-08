import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#fff",
    fontSize: "4rem",
    fontWeight: 200,
    letterSpacing: "3rem",
    fontFamily: "Raleway",
    pointerEvents: "none",
    textShadow: "1px 1px 5px #000",
  },
  subtitle: {
    color: "#fff",
    marginBottom: "3rem",
    marginTop: "2rem",
    fontFamily: "Raleway",
    fontSize: "1.3rem",
    pointerEvents: "none",
    letterSpacing: "5px",
    textShadow: "1px 1px 5px #000",
  },
  typedContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //width: "100vw",
    textAlign: "center",
    zIndex: 1,
    width: "max-content",
    pointerEvents: "none",
  },
}));

const Header = () => {
  const matches = useMediaQuery("(min-width:1500px)");
  const lowermatches = useMediaQuery("(min-width:800px");
  const classes = useStyles();
  return (
    <>
      <Box
        className={classes.typedContainer}
        style={{ width: lowermatches ? "max-content" : "min-content" }}
      >
        <Typography
          variant="h4"
          className={classes.title}
          style={{
            letterSpacing: lowermatches ? "4rem" : "1rem",
            fontWeight: matches ? 300 : 400,
          }}
        >
          Lewis Yates
        </Typography>
        <br />
        <Typography variant="h5" className={classes.subtitle}>
          Web Developer
        </Typography>
      </Box>
    </>
  );
};

export default Header;
