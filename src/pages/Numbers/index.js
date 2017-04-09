import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'RandomGeneratorApp/src/components';
import { Container, Button, Text } from 'native-base';
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

class Numbers extends Component {
  static navigationOptions = {
    title: 'Numbers',
  };
  props: PropsType;

  render() {
    return (
      <Container>
          <Header title="Numbers" />
          <View style={styles.container}>
          <Text style={styles.welcome}>
            This is the Infos page
          </Text>
          <Text style={styles.instructions}>
            It means you have a working router
          </Text>
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </Text>
          <Button primary>
            <Text> Primary </Text>
          </Button>
        </View>
      </Container>
    );
  }
 }

export default Numbers;
