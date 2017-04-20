import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Custom from '../Custom';
import { Container, Content, Button, Text, List, ListItem } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';
import { LocalStorge } from 'RandomGeneratorApp/src/lib'
import { observable, action, runInAction } from "mobx";
import { observer } from "mobx-react";

class CustomStore {
  constructor(id, title, items) {
    this.id = id
    this.title = title
    this.items = items
  }

  save() {
    let localStorage = new LocalStorge(`${this.id}`)
    const { id, title, items } = this
    const value = {
      id,
      title,
      items
    }
    localStorage.save(value)
  }

}

const styles = StyleSheet.create({
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
  }
});

type PropsType = {
  navigation: any,
};

@observer
class CustomList extends Component {
  static navigationOptions = {
    title: 'CustomList',
  };
  props: PropsType;

  @observable items = []
  constructor(props) {
    super(props)
    // var items = [{name: 'test', items: ['d', 'c']}, {name: 'test2', items: ['d', 'c']}];
    // let localStorage = new LocalStorge('Custom')
    // localStorage.save(items)
    this.loadLocalStorage()
  }

  async loadLocalStorage() {
    // let localStorage = new LocalStorge('Custom')
    // let result = await localStorage.load()
    // runInAction("update data about Custom items from local storage.", () => {
    //     this.items.replace(result) 
    // })

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let items = []
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          items.push(JSON.parse(value))
        });
        console.log(items)
        runInAction("update data about Custom items from local storage.", () => {
            this.items.replace(items) 
        })
      });
    });
  }

  _goToNew = () => {
    let id = this.items.length
    const defaultItems = ['default', 'default1']
    let customStore = new CustomStore(`@Custom:${id}`, 'New', defaultItems)
    this.props.navigation.navigate('custom', {
      customStore
    });
  }

  _goToCustom = (custom) => {
    const { id, title, items } = custom
    let customStore = new CustomStore(id, title, items)
    this.props.navigation.navigate('custom', { 
      customStore
     });
  }

  render() {
    return (
        <Container>
          <Content>
            <List dataArray={this.items.slice()}
                renderRow={item =>
                  <Button block style={{margin: 10}} onPress={() => this._goToCustom(item)}>
                    <Text>{item.title}</Text>
                  </Button>
                }>
            </List>
            <Button block style={{margin: 10, backgroundColor: '#FFF829'}} onPress={this._goToNew}>
              <Text style={{color: 'black'}}>New</Text>
            </Button>
          </Content>
        </Container>
    );
  }
}

export default StackNavigator({
  customList: {
    screen: CustomList
  },
  custom: {
    screen: Custom
  }
},{
  initialRouteName: 'customList'
});
