import * as React from 'react'
import { Container, Content, Header, Body, Title, ListItem, Text } from 'native-base'
import { Auth, firebase } from '../Setup'

export default ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>RN Firebase Tutorials</Title>
        </Body>
      </Header>
      <Content>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth')
          }}
        >
          <Text>Authentication</Text>
        </ListItem>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth')
          }}
        >
          <Text>Realtime Database</Text>
        </ListItem>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth')
          }}
        >
          <Text>Cloud Firestore</Text>
        </ListItem>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth')
          }}
        >
          <Text>Cloud storage</Text>
        </ListItem>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth')
          }}
        >
          <Text>Admob</Text>
        </ListItem>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth')
          }}
        >
          <Text>Push Notifications</Text>
        </ListItem>
      </Content>
    </Container>
  )
}
