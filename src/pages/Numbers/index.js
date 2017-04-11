import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'RandomGeneratorApp/src/components';
import { InputNumberInRange } from 'RandomGeneratorApp/src/containers';
import { Container, Content, Button, Text, ListItem, List, CheckBox } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';

import { RangeStore, CounterStore } from 'RandomGeneratorApp/src/stores';
import { observable } from "mobx";
import { observer } from "mobx-react";

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

@observer
class Numbers extends Component {
  static navigationOptions = {
    title: 'Numbers',
  };
  props: PropsType;

  @observable isRepeat = true
  
  constructor (props) {
    super(props)
    let minStore = new CounterStore(0)
    let maxStore = new CounterStore(10)
    this.counterStore = new CounterStore(2)
    this.counterStore.min = 1
    this.rangeStore = new RangeStore(minStore, maxStore)
    this.handleRandomize = this.handleRandomize.bind(this)
  }

  render() {
    return (
      <Container>
        <Content>
          <Header title="Numbers" />
          <InputNumberInRange field='Min' store={this.rangeStore.minStore} inputIcon='arrow-up' />
          <InputNumberInRange field='Max' store={this.rangeStore.maxStore} inputIcon='arrow-down' />
          <InputNumberInRange field='count' store={this.counterStore} inputIcon='list' />

          <ListItem>
            <CheckBox checked={this.isRepeat} onPress={() => this.isRepeat = !this.isRepeat} />
            <Text> Repeat </Text>
          </ListItem>

          <Button block info opPress={this.handleRandomize}>
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
