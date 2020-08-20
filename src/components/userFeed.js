import React, { useState, useEffect } from 'react'
import {
  Typography,
  Card,
  Grid,
  Button
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import addIcon from '../images/add.png'
import { useHistory } from "react-router-dom";
import axios from 'axios'

const styles = theme => ({
  theme: {
    fontFamily: 'Montserrat'
  },
  addIcon: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    '&:hover': {
      cursor: 'pointer',
    }
  },
  firstCard: {
    marginTop: '80px',
    width: '800px',
    raised: 'false',
    borderRadius: '20px',
    border: '#493CE1 2px solid'
  },
  cardChannelTitle: {
    marginTop: '30px',
    marginLeft: '30px',
    fontWeight: 500,
    fontSize: '.9rem',
    color: '#4F4F4F',
    fontFamily: 'Montserrat',
  },
  cardTitle: {
    marginTop: '5px',
    marginLeft: '30px',
    fontWeight: 700,
    fontSize: '1.25rem',
    fontFamily: 'Montserrat',
  },
  caption: {
    marginTop: '5px',
    marginLeft: '30px',
    marginRight: '30px',
    fontWeight: 500,
    fontSize: '1rem',
    fontFamily: 'Montserrat',
  },
  button: {
    marginRight: '20px',
    marginBottom: '20px',
    marginTop: '10px',
    backgroundColor: 'white',
    textTransform: 'none',
    fontSize: '1rem',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    color: '#493CE1',
    width: '150px',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  card: {
    marginTop: '30px',
    width: '800px',
    raised: 'false',
    borderRadius: '20px',
    border: '#493CE1 2px solid'
  },
  appbar: {
    background: 'linear-gradient(45deg, #493CE1 30%, #0CE3BD 80%)'
  },
});

const UserFeed = props => {
  const { classes } = props
  const history = useHistory();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get(`/userfeed/${props.match.params.userId}`)
      .then(res => {
        let orderedLinks = res.data.sort((a, b) => b.timestamp._seconds - a.timestamp._seconds);
        setLinks(orderedLinks)
      })
      .catch(err => console.log(err))
  }, [props])

  const renderLinks = () => {
    return links.map((link, i) =>
      <Card className={i === 0 ? classes.firstCard : classes.card} key={i}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.cardChannelTitle} align='left'>
              {link.channelName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.cardTitle} align='left'>
              <a rel="noopener noreferrer" href={link.link} target="_blank" style={{ color: '#fffff' }}>{link.title}</a>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.caption} align='left'>
              {link.caption}
            </Typography>
          </Grid>
          <Grid item xs={12} align='right' >
            <Button className={classes.button}>
              see thread
                </Button>
          </Grid>
        </Grid>
      </Card>
    )
  }

  return (
    <div>
      <Grid container >
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          {renderLinks()}
        </Grid>
        <Grid item xs={3}>
          {/* <img src={addIcon} className={`${classes.addIcon} ${classes.hover}`} alt="addIcon" width="120" height="120" onClick={() => history.push('/addnew')}></img> */}
        </Grid>
      </Grid >
    </div>
  )
}

export default withStyles(styles)(UserFeed);