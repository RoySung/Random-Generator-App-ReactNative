import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'RandomGeneratorApp/src/components';
import { Container, Content, Button, Text, InputGroup, Input, Icon, ListItem, List, Separator, CheckBox } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';

const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: appStyle.font.size.huge,
    textAlign: 'center',
    margin: appStyle.grid.x1,
  },
  instructions: {
    textAlign: 'center',
    color: appStyle.colors.darkGray,
    marginBottom: appStyle.grid.x1,
  },
});

type PropsType = {
  navigation: any,
};

var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];

class Numbers extends Component {
  static navigationOptions = {
    title: 'Numbers',
  };
  props: PropsType;

  render() {
    return (
      <Container>
        <Content>
          <Header title="Numbers" />
          <InputGroup>
            <Button large rounded info>
              <Icon name='md-remove' />
            </Button>
            <Icon name='arrow-up' style={{color:'#00C497'}}/>
            <Input placeholder='Minimum'/>
            <Button large rounded info>
                <Icon name='md-add' />
            </Button>
          </InputGroup>

          <ListItem>
            <CheckBox checked={true} />
            <Text> Repeat </Text>
          </ListItem>

          <Button block info>
            <Text> Randomize </Text>
          </Button>

          <List dataArray={items}
            renderRow={(item) =>(
              <ListItem itemDivider>
                  <Text>{item}</Text>
              </ListItem>
            )
          }>
          </List>
          
        </Content>
      </Container>
    );
  }
 }

export default Numbers;
