import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'RandomGeneratorApp/src/components';
import { Container, Content, Button, Text, InputGroup, Input, Icon, ListItem, List, Separator, CheckBox } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';


import { observable, computed, autorun } from 'mobx';
import { observer } from "mobx-react";

class CounterStore {
  @observable counter
  min = 0
  max = Number.MAX_VALUE

  constructor(def) {
    this.counter = def
  }

  increment() {
    if (this.counter + 1 > this.max || this.counter + 1 < this.min )
      this.counter + 1 > this.max ? this.counter = this.max : this.counter = this.min
    else
      this.counter++
  }

  decrement() {
    if (this.counter - 1 > this.max || this.counter - 1 < this.min )
      this.counter - 1 > this.max ? this.counter = this.max : this.counter = this.min
    else
      this.counter--
  }

  setCounter(counter) {
    counter = parseInt(counter) ? parseInt(counter) : counter
    // counter = counter > this.min ? counter : this.min
    // counter = counter < this.max ? counter : this.max - 1
    this.counter = counter
  }
}


class RangeStore {
  @observable minStore
  @observable maxStore

  constructor(min, max) {
    this.minStore = min
    this.maxStore = max
    autorun(() => {
      this.minStore.max = this.maxStore.counter - 1
      this.maxStore.min = this.minStore.counter < 1 ? 1 : this.minStore.counter + 1
    });
  }

}


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

@observer
class InputNumberInRange extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <InputGroup>
        <Button large rounded info onPress={() => this.props.store.decrement()}>
          <Icon name='md-remove' />
        </Button>
        <Icon name={this.props.inputIcon} style={{color:'#00C497'}}/>
        <Input placeholder='Minimum'
          keyboardType='numeric'
          value={`${this.props.store.counter}`}
          onChangeText={value => this.props.store.setCounter(value)}
        />
        <Button large rounded info onPress={() => this.props.store.increment()}>
            <Icon name='md-add' />
        </Button>
      </InputGroup>
    );
  }
}

var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];

@observer
class Numbers extends Component {
  static navigationOptions = {
    title: 'Numbers',
  };
  props: PropsType;

  constructor (props) {
    super(props)
    let minStore = new CounterStore(0)
    let maxStore = new CounterStore(10)
    this.rangeStore = new RangeStore(minStore, maxStore)
  }

  render() {
    return (
      <Container>
        <Content>
          <Header title="Numbers" />
          <InputNumberInRange store={this.rangeStore.minStore} inputIcon='arrow-up' />
          <InputNumberInRange store={this.rangeStore.maxStore} inputIcon='arrow-down' />
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
