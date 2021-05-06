import * as React from 'react'
import App from './App'

import firebase from '@react-native-firebase/app'
import Auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYaj2U78klybNpw-Sd053kgGlN7tbV3SI',
//   authDomain: 'react-native-firebase-6ee91.firebaseapp.com',
//   databaseURL: 'https://rnfirebase-b9236-default-rtdb.firebaseio.com/',
//   projectId: 'react-native-firebase-6ee91',
//   storageBucket: 'react-native-firebase-6ee91.appspot.com',
//   messagingSenderId: '409985603109',
//   appId: '1:409985603109:web:15ec9e63a61d1c40e111cc',
// }

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

export { firebase, Auth, database, firestore, storage }

const Setup = () => {
  return <App />
}

export default Setup
