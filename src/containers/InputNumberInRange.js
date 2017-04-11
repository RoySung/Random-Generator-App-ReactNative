import React, { Component } from 'react';
import { InputGroup, Button, Icon, Input, Item, Label, Form } from 'native-base';
import { observer } from "mobx-react";


@observer
class InputNumberInRange extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { store, inputIcon, field } = this.props
    return (
      
      <Item>
        
        <InputGroup>
        
        <Button large rounded info onPress={() => store.decrement()}>
          <Icon name='md-remove' />
        </Button>
        <Label style={{width: '15%'}}> {field} </Label>
        <Icon name={inputIcon} style={{color:'#00C497'}}/>
        
        <Input 
          keyboardType='numeric'
          value={`${store.counter}`}
          onChangeText={value => store.setCounter(value)}
        />
        <Button large rounded info onPress={() => store.increment()}>
          <Icon name='md-add' />
        </Button>
      </InputGroup>
      </Item>
    );
  }
}

export default InputNumberInRange