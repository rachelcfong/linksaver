import React, { useState, useEffect } from 'react'
import {
  Typography,
  IconButton,
  Grid,
  TextField
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles'
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'
import Emoji from './emoji'

const styles = theme => ({
  theme: {
    fontFamily: 'Montserrat'
  },
  channelText: {
    marginLeft: '30px',
    marginTop: '30px',
    fontSize: '1.25rem',
    fontFamily: 'Montserrat',
    fontWeight: '',
    color: 'black',
  },
  linkText: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      color: '#493CE1'
    },
  },
  button: {
    backgroundColor: '#493CE1',
    marginTop: '30px',
    textTransform: 'none',
    fontSize: '1rem',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    color: 'white',
    width: '200px',
    '&:hover': {
      backgroundColor: '#342B9B',
      boxShadow: 'none',
    },
  },
  addButton: {
    marginTop: '30px',
    marginLeft: '15px',
    color: '#493CE1',
  },
  closeButton: {
    marginTop: '30px',
    color: '#EE0072',
  },
  newChannelForm: {
    marginLeft: '30px',
    marginTop: '20px'
  },
  emojiForm: {
    marginLeft: '30px',
    marginTop: '20px',
    width: '50px'
  }
});

const Channels = (props) => {
  const history = useHistory();
  const { classes } = props
  const [newChannel, setNewChannel] = useState(false);
  const [input, setInput] = useState('');
  const [emoji, setEmoji] = useState('');
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios.get('/channels/rachelcamfong')
      .then(res => {
        let orderedChannels = res.data.sort((a, b) => a.timestamp._seconds - b.timestamp._seconds);
        setChannels(orderedChannels)
        console.log('channels ', res.data)
      })
      .catch(err => console.log(err))
  }, [props])

  const handleClick = () => {
    setNewChannel(!newChannel)
  }

  const handleSubmit = () => {
    axios.post('/channel', {
      title: input,
      emoji: emoji,
      handle: 'rachelcamfong'
    })
      .then(
        axios.get('/channels/rachelcamfong')
          .then(res => {
            console.log('GOT CHANNELS ', res.data)
            let orderedChannels = res.data.sort((a, b) => a.timestamp._seconds - b.timestamp._seconds);
            setChannels(orderedChannels)
            setNewChannel(false)
            setInput('')
            setEmoji('')
            console.log('channels ', res.data)
          })
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err))
  }

  const handleClose = () => {
    setNewChannel(false)
    setInput('')
    setEmoji('')
  }

  const renderChannels = () => {
    console.log('render channels', channels)
    return channels.map((channel, i) =>
      <Grid item xs={12} key={i}>
        <Typography className={classes.channelText}>
          <Emoji symbol={channel.emoji} />
          <Link className={classes.linkText} to={`/channel/${channel.title}`} >{`${channel.title}`}</Link>
        </Typography>
      </Grid>
    )
  }

  return (
    <div>
      <Grid container>
        {renderChannels()}
        <Grid item xs={12} >
          {
            newChannel ?
              <div>
                <TextField className={classes.newChannelForm} id="standard-basic" label="new channel" value={input} onChange={e => setInput(e.target.value)} />
                <TextField className={classes.emojiForm} id="standard-basic" label="emoji" value={emoji} onChange={e => setEmoji(e.target.value)} />
                <IconButton className={classes.addButton} aria-label="delete" onClick={handleSubmit}>
                  <AddCircleIcon />
                </IconButton>
                <IconButton className={classes.closeButton} aria-label="delete" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              :
              <IconButton className={classes.addButton} aria-label="delete" onClick={handleClick}>
                <AddCircleIcon />
              </IconButton>
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Channels);