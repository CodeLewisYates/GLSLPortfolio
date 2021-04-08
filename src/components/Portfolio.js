import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

import BaryShapeCollisions from "./THREE/BaryCollisions";

import concord from "../images/concord.jpeg";
import palmtree from "../images/palmtreegetaways.jpeg";
import chatapp from "../images/chat-app.jpeg";
import forkify from "../images/forkify.jpeg";
import burger from "../images/reactburger.jpeg";
import natours from "../images/natours.jpeg";
import eclaires from "../images/eclaires.jpeg";

const useStyles = makeStyles({
  projectContainer: {
    backgroundColor: "transparent",
    height: "100%",
  },
  cardContainer: {
    maxWidth: 345,
    margin: "5rem auto",
    backgroundColor: "rgba(34,34,34,0.3)",
    color: "#f0f5f9",
  },
  button: {
    color: "#ff005c",
    fontWeight: 700,

    "&:hover": {
      backgroundColor: "#810034",
      color: "whitesmoke",
    },
    transition: "all 0.3s",
  },
});

const Portfolio = () => {
  const redirectUser = (link) => {
    window.open(link);
  };

  useEffect(() => {
    if (window.innerWidth > 600) {
      new BaryShapeCollisions();
      new BaryShapeCollisions();
    }

    return () => {
      document.getElementById("barycollisionscontainer")?.removeChild();
    };
  }, []);

  const classes = useStyles();
  return (
    <>
      <div
        id="barycollisionscontainer"
        style={{ position: "absolute", zIndex: -1 }}
      ></div>
      <Box component="div" className={classes.projectContainer}>
        <Navbar />
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card className={classes.cardContainer}>
              <CardMedia
                component="img"
                height="140"
                alt="project"
                image={concord}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Concord
                </Typography>
                <Typography variant="body2" component="p">
                  A social media app that allows users to sign up, create public
                  posts, comment on posts and like posts.
                  <br />
                  Built using the MERN Tech stack with GraphQL and Apollo client
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser(
                        "https://github.com/CodeLewisYates/merng-client"
                      )
                    }
                  >
                    Github
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser("https://concordly.netlify.app/")
                    }
                  >
                    View Site
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Card className={classes.cardContainer}>
              <CardMedia
                component="img"
                height="140"
                alt="project"
                image={palmtree}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  PalmTree Getaways
                </Typography>
                <Typography variant="body2" component="p">
                  A booking site, users can sign up, browse getaways, select
                  dates for a booking and go through stripe checkout (test mode)
                  to create a booking. Users can then view their bookings and
                  update account information.
                  <br />
                  Built using the MERN Tech stack.
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser(
                        "https://github.com/CodeLewisYates/Palm-Tree-Getaways"
                      )
                    }
                  >
                    Github
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser("https://palmtreegetaways.herokuapp.com/")
                    }
                  >
                    View Site
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Card className={classes.cardContainer}>
              <CardMedia
                component="img"
                height="140"
                alt="project"
                image={chatapp}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Chat App
                </Typography>
                <Typography variant="body2" component="p">
                  A real time chat application that users can enter a name and a
                  room to join, they are connected to that room and can then
                  send messages to all users in that room in real time. An extra
                  feature to show who is currently in the room!
                  <br />
                  Built using MERN and web sockets using socket.io
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser(
                        "https://github.com/CodeLewisYates/chat-app-server"
                      )
                    }
                  >
                    Github
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser("https://chat-app-ly.netlify.app/")
                    }
                  >
                    View Site
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Card className={classes.cardContainer}>
              <CardMedia
                component="img"
                height="140"
                alt="project"
                image={forkify}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Forkify
                </Typography>
                <Typography variant="body2" component="p">
                  A client side rendered site using an API, allows users to
                  search for recipes and view paginated results, The user can
                  view the recipe details and also bookmark them.
                  <br />
                  Built using HTML, CSS, JavaScript and utilises local storage.
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser(
                        "https://github.com/CodeLewisYates/forkify-course"
                      )
                    }
                  >
                    Github
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser("https://lewisapp.netlify.app/")
                    }
                  >
                    View Site
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Card className={classes.cardContainer}>
              <CardMedia
                component="img"
                height="140"
                alt="project"
                image={burger}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  React Burger
                </Typography>
                <Typography variant="body2" component="p">
                  A react application where users can customise a burger, they
                  can sign up and order their burger and view their previous
                  orders.
                  <br />
                  Built using React for the frontend and Firebase for database
                  and authentication.
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser(
                        "https://github.com/CodeLewisYates/burger-builder"
                      )
                    }
                  >
                    Github
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser("https://react-burger-2f085.web.app/")
                    }
                  >
                    View Site
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Card className={classes.cardContainer}>
              <CardMedia
                component="img"
                height="140"
                alt="project"
                image={natours}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Natours
                </Typography>
                <Typography variant="body2" component="p">
                  Server side rendered site, users can browse tours and see all
                  tour locations on a dynamic interactive map. Has ability to
                  book tours and use a stripe integrated checkout to place their
                  booking.
                  <br />
                  Built using MongoDB, Express, Mongoose and PUG Templates.
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser(
                        "https://github.com/CodeLewisYates/natoursSSR"
                      )
                    }
                  >
                    Github
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser("https://lewisnatours.herokuapp.com/")
                    }
                  >
                    View Site
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8} md={4}>
            <Card className={classes.cardContainer}>
              <CardMedia
                component="img"
                height="140"
                alt="project"
                image={eclaires}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  E'Claires
                </Typography>
                <Typography variant="body2" component="p">
                  A landing page for a startup chocolate business. Features an
                  interactive map to show the businesses location.
                  <br />
                  Built using JavaScript, HTML and Sass
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      redirectUser(
                        "https://github.com/CodeLewisYates/E-Claires"
                      )
                    }
                  >
                    Github
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() => redirectUser("https://eclaire.netlify.app/")}
                  >
                    View Site
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Portfolio;
