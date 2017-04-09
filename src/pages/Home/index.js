import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Page } from 'RandomGeneratorApp/src/components';
import { Container, Content, Button, Text } from 'native-base';
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
  },
});

type PropsType = {
  navigation: any,
};

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  props: PropsType;

  _goToNumbers = () => {
    this.props.navigation.navigate('numbers');
  }

  render() {
    return (
        <Page>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
              This is the Home page
            </Text>
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{'\n'}
              Shake or press menu button for dev menu
              {'\n'}
            </Text>
            <Button block onPress={this._goToNumbers}>
              <Text>
              Go to the Infos page.    
              </Text>
            </Button>
          </View>
        </Page>
    );
  }
}

export default Home;
