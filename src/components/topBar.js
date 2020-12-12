import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 3,
    color: "white",
    textDecoration: "none",
  },
  button: {
    backgroundColor: "#493CE1",
    textTransform: "none",
    fontSize: "1rem",
    fontFamily: "Montserrat",
    fontWeight: 700,
    color: "white",
    width: "150px",
    "&:hover": {
      backgroundColor: "#342B9B",
      boxShadow: "none",
    },
    marginLeft: "auto",
  },
  appbar: {
    background: "linear-gradient(45deg, #493CE1 30%, #0CE3BD 80%)",
    display: "flex",
  },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Link className={classes.title} to={"/homefeed"}>
            homefeed
          </Link>
          <Button className={classes.button} size="small">
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
