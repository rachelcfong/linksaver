import React, { useState, useEffect } from 'react'
import {
  Typography,
  TextField,
  Grid,
  Button,
  Link
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import Channels from './channels'
import Emoji from './emoji'
import axios from 'axios'

const styles = theme => ({
  theme: {
    fontFamily: 'Montserrat'
  },
  largeTitle: {
    marginRight: '160px',
    marginTop: '500px',
    fontWeight: 700,
    fontSize: '6rem',
    fontFamily: 'Montserrat',
    color: 'white'
  },
  mediumTitle: {
    marginRight: '30px',
    marginTop: '250px',
    marginBottom: '50px',
    fontWeight: 700,
    fontSize: '3rem',
    fontFamily: 'Montserrat',
    color: '#493CE1'
  },
  smallTitle: {
    marginRight: '180px',
    marginTop: '20px',
    fontWeight: 500,
    fontSize: '2rem',
    fontFamily: 'Montserrat',
    color: 'white'
  },
  textbox: {
    width: '350px',
    marginBottom: '20px '
  },
  button: {
    marginTop: '15px',
    marginBottom: '15px',
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
  noAcctButton: {
    textTransform: 'none',

  },
  noAccount: {
    marginTop: '30px',
    marginBottom: '20px ',
  },
  leftGrid: {
    background: 'linear-gradient(45deg, #0CE3BD 10%,#493CE1 100%)',
    height: '100vh'
  },
});

const LoginScreen = props => {
  const { classes } = props
  const [loginForm, setLoginForm] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');

  useEffect(() => {
    setLoginForm(true)
  }, [])

  const handleLogin = () => {
    axios.post('/login', {
      email,
      password
    })
      .then(() => {
        console.log('success!')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSignUp = () => {
    axios.post('/signup', {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle
    })
      .then(() => {
        console.log('success!')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClick = () => {
    setLoginForm(!loginForm)
  }

  const renderLoginForm = () => {
    return (
      <Grid container align='center'>
        <Grid item xs={12}>
          <Typography className={classes.mediumTitle}>
            log in
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textbox} value={email} onChange={e => setEmail(e.target.value)} id='input' label='email' />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textbox} value={password} onChange={e => setPassword(e.target.value)} id='password' label='password' type='password' />
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.button} onClick={handleLogin}>
            submit
        </Button>
        </Grid>
        <Grid className={classes.noAccount} item xs={12}>
          <Button className={classes.noAcctButton} onClick={handleClick}>
            don't have an account? sign up
          </Button>
        </Grid>
      </Grid>
    )
  }

  const renderSignUpForm = () => {
    return (
      <Grid container align='center'>
        <Grid item xs={12}>
          <Typography className={classes.mediumTitle}>
            sign up
      </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textbox} value={email} onChange={e => setEmail(e.target.value)} id='input' label='email' />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textbox} value={password} onChange={e => setPassword(e.target.value)} id='password' label='password' type='password' />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textbox} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} id='password' label='confirm password' type='password' />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textbox} value={handle} onChange={e => setHandle(e.target.value)} id='password' label='handle' />
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.button} onClick={handleSignUp}>
            submit
      </Button>
        </Grid>
        <Grid className={classes.noAccount} item xs={12}>
          <Button className={classes.noAcctButton} onClick={handleClick}>
            have an account? sign in
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      <Grid container>
        <Grid className={classes.leftGrid} item align='right' xs={7} >
          <Typography className={classes.largeTitle}>
            welcome! <Emoji symbol='✨' />
          </Typography>
          <Typography className={classes.smallTitle}>
            save your favorite links. see what your friends are reading.
          </Typography>
        </Grid>
        <Grid item xs={5}>
          {
            loginForm ? renderLoginForm() : renderSignUpForm()
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(LoginScreen);