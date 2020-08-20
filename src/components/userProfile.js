import React from 'react'
import {
  Grid,

} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
// import addIcon from '../images/add.png'
import addIconDark from '../images/addDarken.png'
import { useHistory } from "react-router-dom";
import axios from 'axios'

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
  bio: {
    marginLeft: '30px',
    marginTop: '15px',
    fontSize: '1rem',
    fontFamily: 'Montserrat'
  },
  leftbar: {
    background: 'white',
    borderRight: '0.5px solid #969697'
  },
  divider: {
    backgroundColor: '#969697',
    marginTop: '30px',
    marginLeft: '30px'
  },
  addIcon: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    '&:hover': {
      cursor: 'pointer',
    }
  },
  hover: {
    "&:hover": {
      cursor: 'pointer'
    }
  },
  body: {
    height: '100vh'
  }
});

const UserProfile = (props) => {
  const history = useHistory();

  const handleSubmit = () => {
    axios.post('/user', {
      firstName: 'Rach',
      lastName: 'Fong'
    })
      .catch(err => console.log(err))
    history.push('/addnew')
  }

  const { classes } = props

  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={3}>
          {/* <img src={addIcon} className={`${classes.addIcon} ${classes.hover}`} alt="addIcon" width="120" height="120" onClick={handleSubmit}></img> */}
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(UserProfile);