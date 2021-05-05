// import React from 'react'
import { firebase, Auth } from './Setup'
// import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export const signUpUser = (email, password) => {
  return new Promise((resolve, reject) => {
    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!')
        resolve('SignUp Sucessfully')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        reject(error)
      })
  })
}

export const signInUser = (email, password) => {
  return new Promise((resolve, reject) => {
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log('userCredential.user: ', userCredential.user)
        resolve(JSON.stringify(userCredential.user))
        // ...
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const signOutUser = (email, password) => {
  return new Promise((resolve, reject) => {
    Auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        resolve('SignOut Sucessfully')
      })
      .catch((error) => {
        // An error happened.
        reject(error)
      })
  })
}

export const submitUser = (id = null, name, position) => {
  return new Promise((resolve, reject) => {
    console.log('id: ', id)
    let key
    if (id) {
      key = id
    } else {
      key = database().ref('/users').push().key
    }
    let dataToSave = {
      id: key,
      name: name,
      position: position,
    }
    database()
      .ref('/users/' + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot)
      })
      .catch((error) => reject(error))
  })
}

export const queryUser = (id = null, name, position) => {
  return new Promise((resolve, reject) => {
    database()
      .ref('users')
      .orderByValue()
      .once('value')
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}

export const deleteAllUsersAPI = () => {
  return new Promise((resolve, reject) => {
    database()
      .ref('/users')
      .remove()
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}

export const deleteUserAPI = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject('ID cant be null')
    }

    database()
      .ref('/users/' + id)
      .remove()
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}
