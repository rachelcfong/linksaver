import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDF72QicgNu3MBaIqaO8KI0XglgwSQQIp4",
  authDomain: "skim-f6a35.firebaseapp.com",
  databaseURL: "https://skim-f6a35.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
