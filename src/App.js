import React, { useState } from 'react';
import './App.css';
import {
  Grid,
  makeStyles,
  Fab,
  IconButton
} from '@material-ui/core';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
  useHistory
} from "react-router-dom";
import { createBrowserHistory } from "history";
import AddIcon from '@material-ui/icons/Add';
// import addIcon from './images/add.png'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import UserProfile from './components/userProfile'
import AddLink from './components/addLink'
import SideBar from './components/sideBar'
import TopBar from './components/topBar'
import LinkFeed from './components/linkFeed'
import UserFeed from './components/userFeed'
import HomeFeed from './components/homeFeed'
import LoginScreen from './components/loginScreen'
import AddButton from './components/addButton'

const useStyles = makeStyles((theme) => ({
  theme: {
    fontFamily: 'Montserrat'
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
    fontFamily: 'Montserrat',
    letterSpacing: 3
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
  appbar: {
    background: 'linear-gradient(45deg, #493CE1 30%, #0CE3BD 80%)'
  },
  fab: {
    background: 'linear-gradient(310deg, #EC4BC8 15%, #4535FF 80%)',
    color: 'white',
    transform: 'scale(1.4)',
    position: 'fixed',
    bottom: theme.spacing(8),
    right: theme.spacing(8),
  },
  leftbar: {
    background: 'white',
    borderRight: '0.5px solid #969697'
  },
  button: {
    backgroundColor: '#493CE1',
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
  hover: {
    "&:hover": {
      cursor: 'pointer'
    }
  },
  body: {
    height: '100vh'
  }
}));

const App = () => {
  const classes = useStyles();
  const history = createBrowserHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //TO DO: If logged in, render the login screen across all 12 columns
  //       else render 2 and 10
  return (
    <div >
      <Router history={history}>
        {
          isLoggedIn
            ?
            <div>
              <TopBar />
              <Grid container className={classes.body} >
                <Grid className={classes.leftbar} item xs={2}>
                  <SideBar />
                </Grid>
                <Grid item xs={9}>
                  <Switch>
                    <Route exact path="/addnew" component={AddLink} />
                    <Route exact path="/userfeed/:userId" component={UserFeed} />
                    <Route exact path="/channel/:channelName" component={LinkFeed} />
                    <Route exact path="/homefeed" component={HomeFeed} />
                    <Route exact path="/" component={UserProfile} />
                  </Switch >
                </Grid>
                <Grid item xs={1}>
                  <AddButton />
                </Grid>
              </Grid>
            </div>
            :
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/login" component={LoginScreen} />
              </Switch >
            </Grid>

        }

      </Router >
    </div >
  );
}

export default App;
