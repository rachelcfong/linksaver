import React from 'react'
import {
  Typography,
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from "react-router-dom";

// import axios from 'axios'

const styles = theme => ({
  theme: {
    fontFamily: 'Montserrat'
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
    fontFamily: 'Montserrat',
    letterSpacing: 3
  },
  home: {
    fontWeight: 700,
    fontFamily: 'Montserrat',
    letterSpacing: 3,
    color: 'white',
    textDecoration: 'none'
  },
  button: {
    backgroundColor: '#493CE1',
    textTransform: 'none',
    fontSize: '1rem',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    color: 'white',
    width: '150px',
    '&:hover': {
      backgroundColor: '#342B9B',
      boxShadow: 'none',
    },
  },
  appbar: {
    background: 'linear-gradient(45deg, #493CE1 30%, #0CE3BD 80%)',
  },
});

const TopBar = props => {
  const { classes } = props
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.appbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link className={classes.home} to={'/homefeed'} >homefeed</Link>
          </Typography>
          <Button className={classes.button} size='small'>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(TopBar);