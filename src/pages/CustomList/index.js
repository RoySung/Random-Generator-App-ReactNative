import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Custom from '../Custom';
import { Container, Content, Button, Text, List, ListItem } from 'native-base';
import appStyle from 'RandomGeneratorApp/src/appStyle';

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

class CustomList extends Component {
  static navigationOptions = {
    title: 'CustomList',
  };
  props: PropsType;

  _goToNew = () => {
    this.props.navigation.navigate('custom', {
      title: 'New',
      defaultList: ['default', 'default1']
     });
  }

  _goToCustom = (custom) => {
    this.props.navigation.navigate('custom', { 
      title: custom.name,
      defaultList: custom.items
     });
  }

  render() {
    var items = [{name: 'test', items: ['d', 'c']}, {name: 'test2', items: ['d', 'c']}];
    return (
        <Container>
          <Content>
            <List dataArray={items}
                renderRow={item =>
                  <Button block style={{margin: 10}} onPress={() => this._goToCustom(item)}>
                    <Text>{item.name}</Text>
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
