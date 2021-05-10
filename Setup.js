import * as React from 'react'
import App from './App'

import { Alert } from 'react-native'

import firebase from '@react-native-firebase/app'
import Auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import messaging from '@react-native-firebase/messaging'

import OneSignal from 'react-native-onesignal'

export { firebase, Auth, database, firestore, storage, messaging }

const Setup = () => {
  //Receiving message
  // https://rnfirebase.io/messaging/
  // React.useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
  //   })

  //   return unsubscribe
  // }, [])

  // https://rnfirebase.io/messaging/notifications#handling-interaction
  React.useEffect(() => {
    setupCloudMessaging()

    // Quando o aplicativo está em execução, mas em segundo plano.
    messaging().onNotificationOpenedApp((remoteMessage) => {
      alert('onNotificationOpenedApp', JSON.stringify(remoteMessage))
    })

    // Quando o aplicativo é aberto a partir de um estado de encerramento.
    messaging().getInitialNotification((remoteMessage) => {
      alert('getInitialNotification', JSON.stringify(remoteMessage))
    })

    // Para ouvir as mensagens em primeiro plano, chame o onMessage
    // dentro do código do seu aplicativo.
    messaging().onMessage((remoteMessage) => {
      Alert.alert('onMessage', JSON.stringify(remoteMessage))
    })
  }, [])

  const setupCloudMessaging = async () => {
    //getToken
    const token = await messaging().getToken()
    alert(token)

    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log('Authorization status:', authStatus)
    }
  }

  // React.useEffect(() => {
  //   // OneSignal.setAppId('cfb3f8f7-1d1e-4c86-bd39-000f9bba1473')
  //   OneSignal.init('cfb3f8f7-1d1e-4c86-bd39-000f9bba1473')
  //   OneSignal.addEventListener('received', onReceived)
  //   OneSignal.addEventListener('opened', onOpened)
  //   OneSignal.addEventListener('ids', onIds)

  //   return () => {
  //     OneSignal.removeEventListener('received', onReceived)
  //     OneSignal.removeEventListener('opened', onOpened)
  //     OneSignal.removeEventListener('ids', onIds)
  //   }

  //   // console.log('OneSignal')
  //   // OneSignal.setNotificationOpenedHandler((openedEvent) => {
  //   //   console.log('OneSignal: notification opened:', openedEvent)
  //   //   const { action, notification } = openedEvent
  //   //   console.log('action:', action)
  //   //   console.log('notification:', notification)
  //   // })
  // }, [])

  // const onOpened = (result) => {
  //   // console.log('onOpened Mensagem: ', result.notification.payload.body)
  //   console.log('onOpened result: ', result)
  // }

  // const onReceived = (result) => {
  //   // console.log('onReceived Mensagem: ', result.notification.payload.body)
  //   console.log('onReceived result: ', result)
  // }

  // const onIds = (device) => {
  //   // console.log('onReceived Mensagem: ', result.notification.payload.body)
  //   console.log('device info: ', device)
  // }

  return <App />
}

export default Setup
