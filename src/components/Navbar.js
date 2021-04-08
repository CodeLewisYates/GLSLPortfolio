import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  ListItem,
  IconButton,
  ListItemText,
  ListItemIcon,
  Divider,
  List,
  Typography,
  Box,
} from "@material-ui/core";

import {
  Menu,
  AssignmentInd,
  Home,
  Apps,
  ContactMail,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: "#1e2022",
    height: "100%",
  },
  listItem: {
    color: "#f0f5f9",
  },
}));

const menuItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    path: "/",
  },
  {
    listIcon: <AssignmentInd />,
    listText: "About me",
    path: "/about",
    rotate: true,
  },
  {
    listIcon: <Apps />,
    listText: "Portfolio",
    path: "portfolio",
  },
  {
    listIcon: <ContactMail />,
    listText: "Contact",
    path: "contact",
  },
];

const Navbar = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleSlider = (slider, open) => {
    setState({ ...state, [slider]: open });
  };

  const classes = useStyles();

  const sideList = (slider) => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={() => toggleSlider("right", false)}
    >
      <Typography
        variant="h3"
        style={{
          color: "#ff005c",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          fontWeight: "600",
          fontFamily: "Raleway",
        }}
        align="center"
      >
        LY
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item, key) => (
          <ListItem button key={key} component={Link} to={item.path}>
            <ListItemIcon className={classes.listItem}>
              {item.listIcon}
            </ListItemIcon>
            <ListItemText
              className={classes.listItem}
              primary={item.listText}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Box component="nav">
        <AppBar
          position="absolute"
          style={{
            //borderTop: "2px solid #e1721e",
            background: "rgba(50, 131, 184, 0)",
          }}
        >
          <Toolbar>
            <IconButton onClick={() => toggleSlider("right", true)}>
              <Menu style={{ color: "#f0f5f9" }} />
            </IconButton>
            <Typography variant="h5" style={{ color: "#f0f5f9" }}>
              Portfolio
            </Typography>
            <MobileRightMenuSlider
              open={state.right}
              anchor="right"
              onClose={() => toggleSlider("right", false)}
            >
              {sideList("right")}
            </MobileRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default React.memo(Navbar);
