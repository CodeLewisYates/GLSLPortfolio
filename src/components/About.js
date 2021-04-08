import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Navbar from "./Navbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  heading: {
    color: "#ff005c",
    marginTop: "5rem",
    fontWeight: 400,
    fontSize: "4rem",
    //backgroundColor: "rgba(0,0,0,0.3)",
    width: "max-content",
    margin: "0 auto",
    fontFamily: "Raleway",
    textShadow: "1px 1px 8px #000",
  },
  text: {
    color: "#f0f5f9",
    lineHeight: "30px",
    letterSpacing: "1px",
    margin: "2rem",
    //backgroundColor: "rgba(0,0,0,0.5)",
    fontFamily: "Raleway",
    borderRadius: "10px",
    textShadow: "2px 2px 1px rgb(0,0,0)",
    fontSize: "1.2rem",
  },
  button: {
    backgroundColor: "#e1721e",
    display: "block",
    margin: "2rem auto",
    padding: "1rem 2rem",
    color: "#fff",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#b25a13",
      transform: "scale(1.1)",
    },
  },
  container: {
    position: "absolute",
    top: "5%",
    left: 0,
    zIndex: 10,
    overflow: "hidden",
    marginTop: "1rem",
  },
});
const About = () => {
  const matches = useMediaQuery("(min-width:1000px)");
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box component="div" className={classes.container}>
        <Typography variant="h4" align="center" className={classes.heading}>
          Hello,
        </Typography>
        <Typography
          variant="body1"
          className={classes.text}
          style={{
            margin: matches ? "2rem 30vw" : "2rem",
          }}
        >
          I am a self taught web developer who has a passion for developing both
          functionality and aesthetically pleasing designs and user interfaces.
          I love what I do and wish to pursue a career in web development to put
          my skills to good use.
          <br />
          <br /> I am constantly learning new frameworks and languages to
          improve my ability to create stunning visuals and functionality into
          my projects. I have extensive experience developing in both front end
          and back end sides of a website and applications.
          <br />
          <br />I have built up a large skillset which briefly include an
          advanced knowledge of javascript, styling languages & design skills,
          databases and multiple front end and back end frameworks some examples
          including React.js, Express, Next.js, Sass and GraphQL.
          <br /> <br /> I've also been experimenting a lot with 3D Renderers and
          custom shaders using GLSL to create some stunning effects and sites,
          for example what you see behind!
        </Typography>
      </Box>
      <div
        id="barycollisionscontainer"
        className={classes.barycollisionscontainer}
      ></div>
    </>
  );
};

export default About;
