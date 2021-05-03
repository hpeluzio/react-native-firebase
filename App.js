import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Container, Content } from 'native-base'

import { Text, View, StyleSheet } from 'react-native'

import Home from './screens/Home'
import Auth from './screens/Auth'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.backgroundStyle}>
    //   <Text style={styles.highlight}>App.js</Text>
    // </View>
  )
}

// const styles = StyleSheet.create({
//   backgroundStyle: {
//     backgroundColor: 'white'
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600'
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400'
//   },
//   highlight: {
//     fontWeight: '700'
//   }
// });

export default App
