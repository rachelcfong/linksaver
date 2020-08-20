import React, { useState, useEffect } from 'react'
import {
  Typography,
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'

const styles = theme => ({
  title: {
    flexGrow: 1,
    fontWeight: 700,
    fontFamily: 'Montserrat',
    fontSize: '3rem',
    letterSpacing: 3,
    marginTop: '100px'
  },
  form: {
    marginTop: '60px',
    width: '500px'
  },
  formFont: {
    fontSize: '1.5rem',
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
  formFontSelect: {
    fontSize: '1.25rem',
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
  button: {
    backgroundColor: '#E50DB6',
    marginTop: '50px',
    textTransform: 'none',
    fontSize: '1.5rem',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    color: 'white',
    width: '150px',
    '&:hover': {
      backgroundColor: '#AE0B8A',
      boxShadow: 'none',
    },
  },
  message: {
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    marginTop: '15px'
  }
});

const AddLink = props => {
  const { classes } = props
  const [linkAdded, setLinkAdded] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [link, setLink] = useState('');
  const [channel, setChannel] = useState('');
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios.get('/channels/rachelcamfong')
      .then(res => {
        setChannels(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const onSubmit = () => {
    console.log('channel before post', channel.title)
    axios.post('/link', {
      title: title,
      caption: caption,
      link: link,
      channelName: channel.title,
      //DELETE ONCE TOKENS ARE IMPELEMENTED
      handle: 'rachelcamfong'
    })
      .then(() => {
        setLinkAdded(true)
        setTitle('')
        setCaption('')
        setLink('')
        setChannel('')
      }
      )
      .catch(err => console.log(err))
  }

  const renderChannels = () => {
    return channels.map((channel, i) =>
      <MenuItem key={i} className={classes.formFontSelect} value={channel}>{channel.title}</MenuItem>
    )
  }

  return (
    <div>
      <Grid container justify="center" align="center" >
        <Grid item>
          <Typography className={classes.title}>
            add new link
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.form} value={link} onChange={e => setLink(e.target.value)} InputProps={{ classes: { input: classes.formFont } }} id="standard-basic" label="paste link" />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.form} value={title} onChange={e => setTitle(e.target.value)} InputProps={{ classes: { input: classes.formFont } }} id="standard-basic" label="title" />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.form} value={caption} onChange={e => setCaption(e.target.value)} InputProps={{ classes: { input: classes.formFont } }} id="standard-basic" label="caption" />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.form}>
            <InputLabel id="channel">channel</InputLabel>
            <Select className={classes.form} id='basic' labelId="channel" value={channel} onChange={e => setChannel(e.target.value)}>
              {renderChannels()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.button} size='small' onClick={onSubmit}>
            post
          </Button>
        </Grid>
        <Grid item xs={12}>
          {
            linkAdded ?
              <Typography className={classes.message}>
                success!
              </Typography>
              :
              <div />
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(AddLink);