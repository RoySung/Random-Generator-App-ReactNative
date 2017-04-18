import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, ResultList } from 'RandomGeneratorApp/src/components';
import { InputNumberInRange } from 'RandomGeneratorApp/src/containers';
import { Container, Content, Button, Text, ListItem, List, CheckBox, Icon, Fab, Toast } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';

import { RangeStore, CounterStore } from 'RandomGeneratorApp/src/stores';
import { randomInRange } from 'RandomGeneratorApp/src/lib'
import { observable, action } from "mobx";
import { observer } from "mobx-react";

const styles = StyleSheet.flatten({
  button: {
    margin: 10
  },
  floatButton: {
    marginLeft: 10
  },
  floatButtonColor: {
    backgroundColor: '#5089FF'
  }
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
    this.resetResult = this.resetResult.bind(this)
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
    } else {
      this.popupToast('warning', "It is exceeded the amount available.")
    }
  }

  @action
  handleIsRepeat() {
    this.isRepeat = !this.isRepeat
    this.resetResult()
  }

  @action
  resetResult() {
    this.items = []
    this.popupToast('success', 'Result has refreshed.')
  }

  popupToast(type, text) {
    const option = {
      type: type,
      text: text,
      position: 'bottom',
      duration: 2000
    }
    Toast.show(option)
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
          <Button block info onPress={this.handleRandomize} style={styles.button} >
            <Text> Randomize </Text>
          </Button>
          <ResultList items={this.items.slice()} newlen={this.count} />
        </Content>
        <Fab
            direction="right"
            position="bottomRight"
            containerStyle={styles.floatButton}
            style={styles.floatButtonColor}
            onPress={this.resetResult}
          >
            <Icon name="md-refresh" />
          </Fab>
      </Container>
    );
  }
 }

export default Numbers;
