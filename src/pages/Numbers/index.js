import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, CustomList } from 'RandomGeneratorApp/src/components';
import { InputNumberInRange } from 'RandomGeneratorApp/src/containers';
import { Container, Content, Button, Text, ListItem, List, CheckBox } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';

import { RangeStore, CounterStore } from 'RandomGeneratorApp/src/stores';
import { randomInRange } from 'RandomGeneratorApp/src/lib'
import { observable, action } from "mobx";
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

var items = [0, 6];

@observer
class Numbers extends Component {
  static navigationOptions = {
    title: 'Numbers',
  };
  props: PropsType;

  @observable isRepeat = true
  @observable items = []
  @observable count
  constructor (props) {
    super(props)
    let minStore = new CounterStore(0)
    let maxStore = new CounterStore(10)
    this.counterStore = new CounterStore(2)
    this.counterStore.min = 1
    this.rangeStore = new RangeStore(minStore, maxStore)
    this.handleRandomize = this.handleRandomize.bind(this)
    this.handleIsRepeat = this.handleIsRepeat.bind(this)
  }

  @action
  handleRandomize() {
    const min = this.rangeStore.minStore.counter
    const max = this.rangeStore.maxStore.counter
    const count = parseInt(this.counterStore.counter)
    const items = this.items.slice()
    const rand = randomInRange(min, max, count, this.isRepeat, items)

    if (JSON.stringify(rand) != JSON.stringify(items)) {
      this.count = count
      this.items.replace(rand)
    }
  }

  @action
  handleIsRepeat() {
    this.isRepeat = !this.isRepeat
    this.items = []
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
            <CheckBox checked={this.isRepeat} onPress={this.handleIsRepeat} />
            <Text> Repeat </Text>
          </ListItem>
          
          <Button block info onPress={this.handleRandomize} >
            <Text> Randomize </Text>
          </Button>

          {/*<CustomList items={this.items} newlen={this.items.length} />*/}
          <CustomList items={this.items.slice()} newlen={this.count} />

        </Content>
      </Container>
    );
  }
 }

export default Numbers;
