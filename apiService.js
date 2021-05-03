import React from 'react'
import { Auth } from './Setup'
// import auth from '@react-native-firebase/auth'

export const SignUpUser = (email, password) => {
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

  //   return new Promise((resolve, reject) => {
  //     Auth.createUserWithEmailAndPassword(email, password)
  //       .then(() => {
  //         resolve('SignUp Sucessfully')
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
}

export const SignInUser = (email, password) => {
  return new Promise((resolve, reject) => {
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user
        resolve('SignIn Sucessfully')
        // ...
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        reject(error)
      })
  })
}
