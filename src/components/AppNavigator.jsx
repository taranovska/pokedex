import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "black",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    cursor: "pointer",
    color: "white",
  },
}));

export default function AppNavigator() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.AppBar}>
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography className={classes.title} variant="h6">
            Pokedex
          </Typography>
        </Link>
        <Link to="/favorites" className={classes.link}>
          <Typography
            className={classes.title}
            variant="h6"
            style={{ marginLeft: 15 }}
          >
            Favorites
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
