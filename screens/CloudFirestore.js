import * as React from 'react'
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  ListItem,
  Text,
  Left,
  Icon,
  Button,
  Right,
} from 'native-base'
import { firestore } from '../Setup'

export default ({ navigation }) => {
  const [users, setUsers] = React.useState([])

  const usersCollectionRef = firestore().collection('Users')

  React.useEffect(() => {
    getUsers()
  }, [getUsers])

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot((snapshot) => {
        console.log(snapshot)
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('New city: ', change.doc.data())
          }
          if (change.type === 'modified') {
            console.log('Modified city: ', change.doc.data())
          }
          if (change.type === 'removed') {
            console.log('Removed city: ', change.doc.data())
          }
        })
      })

    // Stop listening for updates when no longer required
    return () => subscriber()
    // firestore()
    //   .collection('Users')
    //   // .where('state', '==', 'CA')
    //   .onSnapshot((snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //       if (change.type === 'added') {
    //         console.log('New city: ', change.doc.data())
    //       }
    //       if (change.type === 'modified') {
    //         console.log('Modified city: ', change.doc.data())
    //       }
    //       if (change.type === 'removed') {
    //         console.log('Removed city: ', change.doc.data())
    //       }
    //     })
    //   })
  }, [])

  const getUsers = React.useCallback(async () => {
    const usersQuery = await firestore().collection('Users').get()
    // console.log(usersQuery)

    setUsers(
      usersQuery._docs.map((user) => {
        return { id: user.id, _data: user._data }
      })
    )

    // console.log('users', users)

    // usersCollectionRef
    //   .doc('ABC')
    //   .get()
    //   .then((documentSnapshot) => {
    //     console.log('User exists: ', documentSnapshot.exists)

    //     if (documentSnapshot.exists) {
    //       console.log('User data: ', documentSnapshot.data())
    //     }
    //   })
    // firestore()
    //   .collection('Users')
    //   // Filter results
    //   .where('age', '>=', 18)
    //   .get()
    //   .then((querySnapshot) => {
    //     console.log('querySnapshot: ', querySnapshot)

    //     //     if (documentSnapshot.exists) {
    //     //       console.log('User data: ', documentSnapshot.data())
    //     //     }
    //   })
  }, [])

  const addUserWithUniqueId = () => {
    usersCollectionRef
      .add({
        name: 'BBB Lovelace2',
        age: 32,
      })
      .then(() => {
        console.log('User added!')
      })
      .catch((err) => console.error(err))
  }

  const setUserWithSpecId = () => {
    usersCollectionRef
      .doc('ABC')
      .set({
        name: 'AdaABC LovelaceABC',
        age: 32,
      })
      .then(() => {
        console.log('User setted!')
      })
      .catch((err) => console.error(err))
  }

  const updateUserWithSpecId = () => {
    usersCollectionRef
      .doc('ABC')
      .update({
        name: 'AdaABC LovelaceABC',
        age: 332,
      })
      .then(() => {
        console.log('User updated!')
      })
      .catch((err) => console.error(err))
  }

  const editUser = (id) => {
    alert(id)
  }

  const deleteUser = (id) => {
    firestore()
      .collection('Users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!')
      })
    alert(id)
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
          <Title>Cloud Firestore </Title>
        </Body>
        <Right style={{ flex: 0.2 }}>
          {/* <Button transparent icon onPress={() => {}}>
            <Icon name="trash" />
          </Button>
          <Button transparent icon onPress={() => {}}>
            <Icon name="save" />
          </Button> */}
        </Right>
      </Header>
      <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button rounded style={{ marginBottom: 5, alignSelf: 'center' }} onPress={getUsers}>
          <Text>Get Users</Text>
        </Button>
        <Button
          rounded
          style={{ marginBottom: 5, alignSelf: 'center' }}
          onPress={addUserWithUniqueId}
        >
          <Text>Add data - addUserWithUniqueId</Text>
        </Button>

        <Button
          rounded
          style={{ marginBottom: 5, alignSelf: 'center' }}
          onPress={updateUserWithSpecId}
        >
          <Text>Update data - updateUserWithSpecId</Text>
        </Button>

        <Button
          rounded
          style={{ marginBottom: 5, alignSelf: 'center' }}
          onPress={setUserWithSpecId}
        >
          <Text>Set data - setUserWithSpecId</Text>
        </Button>

        <Button rounded style={{ marginBottom: 5, alignSelf: 'center' }}>
          <Text>Delete data</Text>
        </Button>
        <Button rounded style={{ marginBottom: 5, alignSelf: 'center' }}>
          <Text>Delete data based on ID</Text>
        </Button>
        {/* <ListItem
          onPress={() => {
            navigation.navigate('Home')
          }}
        >
          <Text>Home</Text>
        </ListItem> */}
        {users.map((item, index) => (
          <ListItem icon key={item.id}>
            {/* <Text>{JSON.stringify(item)}</Text> */}
            <Left style={{ width: '75%' }}>
              <Text>{JSON.stringify(item._data)}</Text>
            </Left>
            <Right>
              <Button transparent onPress={() => editUser(item.id)}>
                <Icon active name="create" />
              </Button>
              <Button transparent onPress={() => deleteUser(item.id)}>
                <Icon active name="trash" />
              </Button>
            </Right>
          </ListItem>
        ))}
      </Content>
    </Container>
  )
}
