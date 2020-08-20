import React from 'react'
import {
  Typography,
  Divider,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import Channels from './channels'
import { Link } from "react-router-dom";

// import axios from 'axios'

const styles = theme => ({
  theme: {
    fontFamily: 'Montserrat'
  },
  name: {
    marginLeft: '30px',
    marginTop: '30px',
    fontWeight: 700,
    fontSize: '2rem',
    fontFamily: 'Montserrat'
  },
  nameLink: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: '#493CE1'
    },
  },
  bio: {
    marginLeft: '30px',
    marginRight: '30px',
    marginTop: '15px',
    fontSize: '1rem',
    fontFamily: 'Montserrat'
  },
  divider: {
    backgroundColor: '#969697',
    marginTop: '30px',
    marginRight: '30px',
    marginLeft: '30px'
  },
});

const SideBar = props => {
  const { classes } = props
  return (
    <div>
      <Typography className={classes.name}>
        <Link className={classes.nameLink} to={`/userfeed/rachelcamfong`} >rachel fong</Link>
      </Typography>
      <Typography className={classes.bio} >
        fighting Twitter harassment <b>@BlockParty</b>, baking cute desserts <b>@KawaiiSweetWorld</b>, trying to finding the motivation to workout <b>@MyHouse : )</b>
      </Typography>
      <Divider className={classes.divider} />
      <Channels />
    </div>
  )
}

export default withStyles(styles)(SideBar);