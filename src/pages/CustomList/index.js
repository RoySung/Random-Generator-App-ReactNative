import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Custom from '../Custom';
import { Container, Content, Button, Text, List, ListItem } from 'native-base';
import { CustomStore } from 'RandomGeneratorApp/src/stores';
import appStyle from 'RandomGeneratorApp/src/appStyle';
import { observable, action, runInAction } from "mobx";
import { observer } from "mobx-react";

const styles = StyleSheet.flatten({
  content: {
    backgroundColor: 'white'
  }
});

type PropsType = {
  navigation: any,
};

@observer
class CustomList extends Component {
  // static navigationOptions = {
  //   title: 'CustomList',
  // };
  static navigationOptions = ({ navigation }) => {
    console.log(JSON.stringify(navigation.state))
    if (navigation.state.params)
      navigation.state.params.loadLocalStorage()
    return {
      title: 'CustomList'
    }
  }
  props: PropsType;

  @observable items = []
  constructor(props) {
    super(props)
    // var items = [{name: 'test', items: ['d', 'c']}, {name: 'test2', items: ['d', 'c']}];
    // let localStorage = new LocalStorge('Custom')
    // localStorage.save(items)
    // this.loadLocalStorage()
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
          console.log(JSON.stringify(this.items.slice()) !== JSON.stringify(items))
          if(this.items !== items)
            this.items.replace(items) 
        })
      });
    });
  }

  _goToNew = () => {
    let id = this.items.length + 1
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
  
  componentWillMount() {
    console.log('componentWillMount')
    if (!this.props.navigation.state.params)
      this.props.navigation.setParams({ loadLocalStorage: () => this.loadLocalStorage() })
  }

  render() {
    return (
        <Container>
          <Content style={styles.content}>
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
