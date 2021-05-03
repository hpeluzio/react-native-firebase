import * as React from 'react';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  ListItem,
  Text
} from 'native-base';
import {Auth, firebase} from '../Setup';

export default ({navigation}) => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>React Native Firebase Tutorials</Title>
        </Body>
      </Header>
      <Content>
        <ListItem
          onPress={() => {
            navigation.navigate('Auth');
          }}>
          <Text>Authentication</Text>
        </ListItem>
      </Content>
    </Container>
  );
};
