import * as React from 'react'
import App from './App'

import firebase from '@react-native-firebase/app'
import Auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import OneSignal from 'react-native-onesignal'

// React.useEffect(() => {
//   console.log('OneSignal')
// }, [])
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
  React.useEffect(() => {
    // OneSignal.setAppId('cfb3f8f7-1d1e-4c86-bd39-000f9bba1473')
    OneSignal.init('cfb3f8f7-1d1e-4c86-bd39-000f9bba1473')
    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', onOpened)
    OneSignal.addEventListener('ids', onIds)

    return () => {
      OneSignal.removeEventListener('received', onReceived)
      OneSignal.removeEventListener('opened', onOpened)
      OneSignal.removeEventListener('ids', onIds)
    }

    // console.log('OneSignal')
    // OneSignal.setNotificationOpenedHandler((openedEvent) => {
    //   console.log('OneSignal: notification opened:', openedEvent)
    //   const { action, notification } = openedEvent
    //   console.log('action:', action)
    //   console.log('notification:', notification)
    // })
  }, [])

  const onOpened = (result) => {
    // console.log('onOpened Mensagem: ', result.notification.payload.body)
    console.log('onOpened result: ', result)
  }

  const onReceived = (result) => {
    // console.log('onReceived Mensagem: ', result.notification.payload.body)
    console.log('onReceived result: ', result)
  }

  const onIds = (device) => {
    // console.log('onReceived Mensagem: ', result.notification.payload.body)
    console.log('device info: ', device)
  }

  return <App />
}

export default Setup
