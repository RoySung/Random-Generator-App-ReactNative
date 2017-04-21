import React from 'react';
import { List, ListItem, Text } from 'native-base';

export default CustomList = props => (
  <List>
    {props.items.map((value, key) => (
      <ListItem key={key} itemDivider={key < props.newlen}>
          <Text>{key + 1}. </Text>
          <Text> {value} </Text>
      </ListItem>
    ))}
  </List>
);