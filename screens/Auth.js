import * as React from 'react';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  ListItem,
  Text,
  Button,
  Left,
  Right,
  Icon
} from 'native-base';
import {Auth, firebase} from '../Setup';

// import Icon from 'react-native-vector-icons/MaterialIcons';

export default ({navigation}) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            icon
            onPress={() => {
              navigation.goBack();
            }}>
            {/* <Icon name="arrow-back" size={30} /> */}
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Auth</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth');
          }}>
          <Text>Auth</Text>
        </ListItem>
      </Content>
    </Container>
  );
};
