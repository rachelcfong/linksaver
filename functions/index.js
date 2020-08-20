const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();

const config = {
  apiKey: "AIzaSyDF72QicgNu3MBaIqaO8KI0XglgwSQQIp4",
  authDomain: "skim-f6a35.firebaseapp.com",
  databaseURL: "https://skim-f6a35.firebaseio.com",
  projectId: "skim-f6a35",
  storageBucket: "skim-f6a35.appspot.com",
  messagingSenderId: "564557847651",
  appId: "1:564557847651:web:4928f59e085dc3c305ec56",
  measurementId: "G-M5L9HKBS38"
};

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

const FBAuth = (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found')
    return res.status(403).json({ error: 'Unauthorized' })
  }

  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      console.log(decodedToken)
      return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      req.body.handle = data.docs[0].data().handle;
      return next();
    })
    .catch(err => {
      console.error('Error while verifying token')
      return res.status(403).json(err)
    })
}

app.get('/users', (req, res) => {
  db.collection('users').get()
    .then(data => {
      let users = []
      data.forEach(doc =>
        users.push(doc.data()))
      return res.json(users)
    })
    .catch(err => console.log(err))
})

//Get all the channels for the specified user
app.get('/channels/:userHandle', (req, res) => {
  db.collection('channels').where('userHandle', '==', req.params.userHandle)
    .get()
    .then(data => {
      console.log('data ', data)
      let channels = []
      data.forEach(doc => {
        channels.push({ id: doc.id, ...doc.data() })
      })
      console.log('channels ', channels)
      res.status(200).send(channels)
      return null;
    })
    .catch(err => console.log(err))
})

app.get('/links/:channelName', (req, res) => {
  db.collection('links').where('channelName', '==', req.params.channelName).orderBy("timestamp", "desc")
    .get()
    .then(data => {
      let links = []
      data.forEach(doc => {
        links.push({ id: doc.id, ...doc.data() })
      })
      res.send(links)
      return null;
    })
    .catch(err => {
      res.status(500).json({ message: `something went wrong ${err}` })
    })
})

app.get('/userfeed/:handle', (req, res) => {
  db.collection('links').where('userHandle', '==', req.params.handle).orderBy("timestamp", "desc")
    .get()
    .then(data => {
      let links = []
      data.forEach(doc => {
        links.push({ id: doc.id, ...doc.data() })
      })
      res.status(200).send(links)
      return null;
    }).catch(err => {
      res.status(500).send({ message: `something went wrong ${err}` })
    })
})

app.get('/homefeed', (req, res) => {
  db.collection('links')
    .get()
    .then(data => {
      let links = []
      data.forEach(doc => {
        links.push({ id: doc.id, ...doc.data() })
      })
      res.status(200).send(links)
      return null;
    })
    .catch(err => {
      res.status(500).send({ message: `something went wrong ${err}` })
    })
})

const isEmpty = string => {
  return string.trim() === '';
}

const isEmail = email => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
}

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  console.log('new user', newUser)
  //Validation
  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty'
  if (newUser.password !== newUser.confirmPassword) errors.password = 'Passwords must match'

  if (isEmpty(newUser.handle)) errors.handle = 'Must not be empty'

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

  //Create new user
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' })
      } else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date(),
        userId: userId
      }
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token: token })
    })
    .catch(err => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' })
      } else {
        return res.status(500).json({ error: err.code })
      }

    })
})

app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  let errors = {}

  if (isEmpty(user.email)) errors.email = 'Must not be empty'
  if (isEmpty(user.password)) errors.password = 'Must not be empty'

  if (Object.keys(errors).length > 0) return res.status(500).json(errors)

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token })
    })
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/wrong-password') {
        return res.status(403).json({ general: 'Wrong credentials, please try again' })
      } else {
        return res.status(500).json({ error: err.code })
      }
    })
})

app.post('/channel', (req, res) => {
  const newChannel = {
    title: req.body.title,
    emoji: req.body.emoji,
    userHandle: req.body.handle,
    timestamp: new Date()
  }
  db.collection('channels').add(newChannel)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` })
      return null;
    })
    .catch(err => {
      res.status(500).json({ message: `something went wrong ${err}` })
    })
})

app.post('/link', (req, res) => {
  const newLink = {
    title: req.body.title,
    caption: req.body.caption,
    link: req.body.link,
    channelName: req.body.channelName,
    timestamp: admin.firestore.Timestamp.fromDate(new Date()),
    userHandle: req.body.handle
  }

  db.doc(`/channel/${newLink.channelName}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ channel: 'this channel already exists' })
      } else {
        return null
      }
    })
    .then(() => {
      return db.collection('links').add(newLink)
    })
    .then((doc) => {
      return res.status(200).json({ message: `Link added` })
    })
    .catch(err => {
      console.error(err)
      return res.status(400).json(err)
    })
})

exports.api = functions.https.onRequest(app);