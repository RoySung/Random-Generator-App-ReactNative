import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, CustomList } from 'RandomGeneratorApp/src/components';
import { InputNumberInRange, CustomListInputText } from 'RandomGeneratorApp/src/containers';
import { Container, Content, Button, Text, ListItem, List, CheckBox, Icon, Fab, Toast } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';

import { RangeStore, CounterStore } from 'RandomGeneratorApp/src/stores';
import { randomInRange } from 'RandomGeneratorApp/src/lib'
import { observable, action } from "mobx";
import { observer } from "mobx-react";

class ListStore {
  @observable list
  constructor(list) {
    this.list = list
  }

  @action
  newItem() {
    let list = this.list.slice()
    list.push(`default${this.list.length}`)
    this.list.replace(list)
  }

  @action
  setItem(index, text) {
    this.list[index] = text
  }

  @action
  removeItem(index) {
    this.list.splice(index, 1)
  }

}

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

@observer
class Custom extends Component {
  static navigationOptions = {
    title: 'Custom',
  };
  props: PropsType;

  @observable isRepeat = true
  @observable resultKey = []
  @observable result = []
  @observable count
  constructor (props) {
    super(props)
    let defaultList = ['default', 'default1']
    this.listStore = new ListStore(defaultList)
    this.counterStore = new CounterStore(2)
    this.counterStore.min = 1
    this.handleRandomize = this.handleRandomize.bind(this)
    this.handleIsRepeat = this.handleIsRepeat.bind(this)
    this.resetResult = this.resetResult.bind(this)
  }

  @action
  handleRandomize() {
    const count = parseInt(this.counterStore.counter)
    const resultKey = this.resultKey.slice()
    const max = this.listStore.list.length - 1
    const rand = randomInRange(0, max, count, this.isRepeat, resultKey)

    if (JSON.stringify(rand) != JSON.stringify(resultKey)) {
      this.count = count
      this.resultKey.replace(rand)
      this.resultKey.map((value, key) => {
        this.result[key] = this.listStore.list[value]
      })
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
    this.result = []
    this.resultKey = []
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
          <Header title="Custom" />
          <CustomListInputText store={this.listStore} />

          <Button block info onPress={() => this.listStore.newItem()} >
            <Icon name='md-add' />
          </Button>
          

          
          <InputNumberInRange field='count' store={this.counterStore} inputIcon='list' />
          <ListItem>
            <CheckBox checked={this.isRepeat} onPress={this.handleIsRepeat} />
            <Text> Repeat </Text>
          </ListItem>          
          <Button block info onPress={this.handleRandomize} style={styles.button} >
            <Text> Randomize </Text>
          </Button>
          <CustomList items={this.result.slice()} newlen={this.count} />
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

export default Custom;
