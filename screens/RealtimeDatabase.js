import * as React from 'react'
import { Alert } from 'react-native'
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  ListItem,
  Text,
  Icon,
  Item,
  Input,
  Left,
  Right,
  Button,
} from 'native-base'
import { database } from '../Setup'
import { submitUser, queryUser, deleteAllUsersAPI, deleteUserAPI } from '../apiService'

export default ({ navigation }) => {
  const [id, setId] = React.useState()
  const [users, setUsers] = React.useState([])
  const [name, setName] = React.useState()
  const [position, setPosition] = React.useState()

  React.useEffect(() => {
    const userRef = database().ref('/users')
    const onLoadingListener = userRef.on('value', (snapshot) => {
      setUsers([])
      snapshot.forEach((childSnapshot) => {
        // console.log('childSnapshot.val(): ', childSnapshot.val())
        setUsers((users) => [...users, childSnapshot.val()])
      })
    })
    return () => {
      userRef.off('value', onLoadingListener)
    }
  }, [])

  const saveUsers = () => {
    submitUser(id, name, position)
      .then((result) => {
        setId(null)
        setName('')
        setPosition('')
        alert(result)
      })
      .catch((err) => alert(err))
  }

  const query = () => {
    queryUser()
      .then((result) => {
        console.log(result)
        alert(JSON.stringify(result))
      })
      .catch((err) => alert(err))
  }

  const editUser = (id) => {
    alert(id)
  }

  const deleteUser = (user) => {
    console.log('user: ', user)
    Alert.alert(
      `Are you sure about delete user ${user.name}?`,
      'This operations cant be undone',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          // onPress: () => console.log('OK Pressed'),
          onPress: () => {
            deleteUserAPI(user.id) //.then(() => setUsers([]))
          },
        },
      ],
      { cancelable: false }
    )
  }

  const deleteAllUsers = () => {
    Alert.alert(
      'Are you sure about delete all user?',
      'This operations cant be undone',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          // onPress: () => console.log('OK Pressed'),
          onPress: () => {
            deleteAllUsersAPI().then(() => setUsers([]))
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <Container>
      <Header>
        <Left style={{ flex: 0.2 }}>
          <Button transparent icon onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 1, justifyContent: 'center' }}>
          <Title>Realtime Database</Title>
        </Body>
        <Right style={{ flex: 0.2 }}>
          <Button transparent icon onPress={deleteAllUsers}>
            <Icon name="trash" />
          </Button>
          <Button transparent icon onPress={saveUsers}>
            <Icon name="save" />
          </Button>
        </Right>
      </Header>
      <Header searchBar rounded>
        <Item>
          <Input placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
        </Item>
        <Item>
          <Input
            keyboardType="numeric"
            placeholder="Position"
            value={position}
            onChangeText={(text) => setPosition(text)}
          />
        </Item>
      </Header>
      <Content padder>
        {users.map((item, index) => (
          <ListItem icon key={item.id}>
            <Body>
              <Text>
                {'Name : '}
                {item.name}
              </Text>
              <Text>
                {'Position : '}
                {item.position}
              </Text>
            </Body>
            <Right>
              <Button transparent onPress={() => editUser('item')}>
                <Icon active name="create" />
              </Button>
              <Button transparent onPress={() => deleteUser(item)}>
                <Icon active name="trash" />
              </Button>
            </Right>
          </ListItem>
        ))}
      </Content>
    </Container>
  )
}
