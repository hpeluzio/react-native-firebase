import * as React from 'react'
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Text,
  Button,
  Left,
  Right,
  Icon,
  Form,
  Item,
  Label,
  Input,
} from 'native-base'
import { Auth, firebase } from '../Setup'
import auth from '@react-native-firebase/auth'
import { SignUpUser, SignInUser, SignOutUser } from '../apiService'

// import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({ navigation }) => {
  const [state, setState] = React.useState({
    emailAddress: '',
    password: '',
  })
  const [initializing, setInitializing] = React.useState(true)
  const [user, setUser] = React.useState()

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  const signUp = () => {
    SignUpUser(state.emailAddress, state.password)
      .then((data) => {
        alert(data)
      })
      .catch((error) => {
        alert(error)
      })
    // alert(JSON.stringify(state))
  }

  const signIn = () => {
    SignInUser(state.emailAddress, state.password)
      .then((data) => {
        alert(data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const signOut = () => {
    SignOutUser(state.emailAddress, state.password)
      .then((data) => {
        alert(data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            // icon
            onPress={() => {
              navigation.goBack()
            }}
          >
            {/* <Icon name="arrow-back" size={30} /> */}
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Authentication</Title>
        </Body>
        <Right>
          {user && (
            <Button onPress={signOut}>
              <Icon name="log-out" />
            </Button>
          )}
        </Right>
      </Header>
      <Content>
        {/* SignUPFORM */}

        <Form>
          <Item floatingLabel>
            <Label>Email Adress</Label>
            <Input
              keyboardType="email-address"
              value={state.emailAddress}
              onChangeText={(text) => setState({ ...state, emailAddress: text })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              value={state.password}
              onChangeText={(text) => setState({ ...state, password: text })}
            />
          </Item>
          <Button block onPress={signUp}>
            <Text>Sign Up</Text>
          </Button>
        </Form>

        <Form>
          <Item floatingLabel>
            <Label>Email Adress</Label>
            <Input
              keyboardType="email-address"
              value={state.emailAddress}
              onChangeText={(text) => setState({ ...state, emailAddress: text })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              value={state.password}
              onChangeText={(text) => setState({ ...state, password: text })}
            />
          </Item>
          <Button block onPress={signIn}>
            <Text>Sign In</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}
